import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

const NavButton = (props) => {
  const {onPress, text, textStyle} = props;
  const tStyle = [styles.text, textStyle];

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={tStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NavButton;
