import React from 'react';
import {Image} from 'react-native';

import styles from './styles';

const TabIcon = (props) => {
  const {source, active} = props;

  const iconStyle = [styles.icon, active && styles.activeIcon];

  return <Image source={source} style={iconStyle} resizeMode="contain" />;
};

export default TabIcon;
