import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  base: {
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: colors.white,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
});
