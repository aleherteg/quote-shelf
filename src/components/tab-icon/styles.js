import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
    marginTop: 5,
    tintColor: colors.gray,
  },
  activeIcon: {
    tintColor: colors.primary,
  },
});
