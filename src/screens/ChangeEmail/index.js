import React, {useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';

import Input from '../../components/input';
import SubmitButton from '../../components/submit-button';
import Loading from '../../components/Loading';
import {showError} from '../../utils/alert';

import styles from './styles';

const ChangeEmail = (props) => {
  const {navigation, loading, updateEmail} = props;

  const [email, setEmail] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [password, setPassword] = useState('');

  const confirmedEmailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = () => {
    let errorMessage = null;
    if (!email) {
      errorMessage = 'You must enter a email!';
    } else if (!confirmedEmail) {
      errorMessage = 'You must confirm the email!';
    } else if (!password) {
      errorMessage = 'You must enter the password!';
    } else if (email !== confirmedEmail) {
      errorMessage = 'Email and confirmed email should be the same!';
    }
    if (errorMessage) {
      showError(errorMessage);
      return;
    }

    updateEmail(email, password, () => {
      navigation.goBack();
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={styles.base}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View>
        <Input
          label="New Email"
          value={email}
          onChange={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => {
            if (confirmedEmailRef?.current?.focus) {
              confirmedEmailRef.current.focus();
            }
          }}
          blurOnSubmit={false}
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Input
          inputRef={confirmedEmailRef}
          label="Confirm Email"
          value={confirmedEmail}
          onChange={setConfirmedEmail}
          returnKeyType="next"
          onSubmitEditing={() => {
            if (passwordRef?.current?.focus) {
              passwordRef.current.focus();
            }
          }}
          blurOnSubmit={false}
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Input
          inputRef={passwordRef}
          label="Password"
          value={password}
          onChange={setPassword}
          returnKeyType="done"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton onPress={onSubmit} text="Confirm" />
      </View>
    </ScrollView>
  );
};

export default ChangeEmail;
