import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  base: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 110,
    width: 110,
    tintColor: colors.white,
  },
  content: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
    color: colors.primary,
  },
});
