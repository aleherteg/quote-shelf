import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import BooksService from '../services/books';
import QuotesService from '../services/quotes';

import {showError} from '../utils/alert';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = async (_user) => {
    BooksService.setUserID(_user?.uid);
    QuotesService.setUserID(_user?.uid);

    if (!user && _user) {
      await BooksService.merge(_user?.uid);
      await QuotesService.merge(_user?.uid);
    }

    setUser(_user);

    if (_user && !initialized) {
      setInitialized(true);
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const initialize = () => {
    setInitialized(true);
  };

  const authenticate = (email, password, cb) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (cb) {
          cb();
        }
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          showError('The password is incorrect!');
        } else {
          showError('Something went wrong, please try again!');
        }
        setLoading(false);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          showError('The password is incorrect!');
        } else {
          showError('Something went wrong, please try again!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = (email, password) => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showError('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        } else {
          showError('Something went wrong, please try again!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateEmail = (newEmail, password, cb) => {
    setLoading(true);

    authenticate(user?.email, password, () => {
      user
        .updateEmail(newEmail)
        .then(() => {
          const _user = auth().currentUser;
          setUser(_user);
          setLoading(false);
          if (cb) {
            cb();
          }
        })
        .catch((error) => {
          setLoading(false);
          showError(error.message);
        });
    });
  };

  const updatePassword = (newPassword, password, cb) => {
    setLoading(true);

    authenticate(user?.email, password, () => {
      user
        .updatePassword(newPassword)
        .then(() => {
          setLoading(false);
          if (cb) {
            cb();
          }
        })
        .catch((error) => {
          setLoading(false);
          showError(error.message);
        });
    });
  };

  const logout = () => {
    setLoading(true);
    auth()
      .signOut()
      .catch(() => {
        showError('Something went wrong, please try again!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        user,
        loading,
        initialize,
        login,
        register,
        updateEmail,
        updatePassword,
        logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthContext.Consumer>
        {(state) => <Component {...props} {...state} />}
      </AuthContext.Consumer>
    );
  };
}
