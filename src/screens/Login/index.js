import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';

import Loading from '../../components/Loading';
import Input from '../../components/input';
import Spacer from '../../components/Spacer';
import SubmitButton from '../../components/submit-button';

import {showError} from '../../utils/alert';

import styles from './styles';

const Login = (props) => {
  const {navigation, login, loading} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const valdate = () => {
    if (!email) {
      showError('Email is required!');
      return false;
    }
    if (!password) {
      showError('Password is required!');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (valdate()) {
      login(email, password);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.base}>
      <View>
        <Input
          label="Email"
          value={email}
          onChange={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => {
            if (passwordRef?.current?.focus) passwordRef.current.focus();
          }}
          blurOnSubmit={false}
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Spacer size={10} />
        <Input
          inputRef={passwordRef}
          label="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
          returnKeyType="done"
          autoCompleteType="password"
          autoCapitalize="none"
        />
        <Spacer size={30} />
        <Text style={styles.description}>
          Login or{' '}
          <Text style={styles.register} onPress={navigateToRegister}>
            register
          </Text>{' '}
          to store the quotes into your account.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton onPress={onSubmit} text="Submit" />
      </View>
    </View>
  );
};

export default Login;
