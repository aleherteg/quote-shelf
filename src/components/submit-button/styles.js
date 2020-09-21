import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
