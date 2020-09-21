import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import styles from './styles';

const IconButton = (props) => {
  const {onPress, source, iconStyle} = props;
  const imageStyle = [styles.icon, iconStyle];

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={source} style={imageStyle} />
    </TouchableOpacity>
  );
};

export default IconButton;
