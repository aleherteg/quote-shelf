import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './styles';
import SubmitButton from '../../components/submit-button';
import Spacer from '../../components/Spacer';
import {icons} from '../../assets';

const Initial = (props) => {
  const {navigation, initialize} = props;

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.base}>
      <View style={styles.header}>
        <Image style={styles.image} source={icons.student} />
      </View>
      <View style={styles.content}>
        <Spacer size={80} />
        <Text style={styles.description}>
          Please login in order to store the quotes into your account.
        </Text>
        <Spacer size={20} />
        <SubmitButton onPress={goToLogin} text="Go to login" />
        <Spacer size={20} />
        <SubmitButton onPress={initialize} text="Continue without login" />
      </View>
    </View>
  );
};

export default Initial;
