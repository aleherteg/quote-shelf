import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {colors} from '../../themes';

import styles from './styles';

const Loading = () => {
  return (
    <View style={styles.base}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

export default Loading;
