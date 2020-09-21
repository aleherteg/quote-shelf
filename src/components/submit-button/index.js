import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

const SubmitButton = (props) => {
  const {onPress, text} = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
