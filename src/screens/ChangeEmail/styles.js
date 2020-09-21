import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    zIndex: 10,
  },
});
