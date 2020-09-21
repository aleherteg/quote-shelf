import React from 'react';
import {View} from 'react-native';
import {colors} from '../../themes';

const Line = ({
  size = 1,
  vertical = false,
  marginVertical,
  marginHorizontal,
  color = colors.gray,
}) => {
  const style = [
    vertical ? {width: size} : {height: size},
    {backgroundColor: color},
    marginVertical && {marginVertical},
    marginHorizontal && {marginHorizontal},
  ];
  return <View style={style} />;
};

export default Line;
