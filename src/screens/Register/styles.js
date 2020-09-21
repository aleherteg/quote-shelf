import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  base: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  description: {
    fontSize: 17,
    paddingHorizontal: 5,
    color: colors.primary,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
});
