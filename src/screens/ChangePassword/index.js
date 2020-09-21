import React, {useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';

import Input from '../../components/input';
import SubmitButton from '../../components/submit-button';
import Loading from '../../components/Loading';
import {showError} from '../../utils/alert';

import styles from './styles';

const ChangePassword = (props) => {
  const {navigation, updatePassword, loading} = props;

  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const confirmedPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);

  const onSubmit = () => {
    let errorMessage = null;
    if (!password) {
      errorMessage = 'You must enter a password!';
    } else if (!confirmedPassword) {
      errorMessage = 'You must confirm the password!';
    } else if (!currentPassword) {
      errorMessage = 'You must enter the current password!';
    } else if (password?.length < 6) {
      errorMessage = 'Password should be at least 6 characters!';
    } else if (password !== confirmedPassword) {
      errorMessage = 'Password and confirmed password should be the same!';
    }
    if (errorMessage) {
      showError(errorMessage);
      return;
    }

    updatePassword(password, currentPassword, () => {
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
          label="New Password"
          value={password}
          onChange={setPassword}
          returnKeyType="next"
          onSubmitEditing={() => {
            if (confirmedPasswordRef?.current?.focus) {
              confirmedPasswordRef.current.focus();
            }
          }}
          secureTextEntry
          blurOnSubmit={false}
          autoCompleteType="password"
          autoCapitalize="none"
        />
        <Input
          inputRef={confirmedPasswordRef}
          label="Confirm Password"
          value={confirmedPassword}
          onChange={setConfirmedPassword}
          returnKeyType="next"
          onSubmitEditing={() => {
            if (currentPasswordRef?.current?.focus) {
              currentPasswordRef.current.focus();
            }
          }}
          secureTextEntry
          blurOnSubmit={false}
          autoCompleteType="password"
          autoCapitalize="none"
        />
        <Input
          inputRef={currentPasswordRef}
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
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

export default ChangePassword;
