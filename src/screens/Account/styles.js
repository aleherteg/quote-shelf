import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  header: {
    height: '45%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.primary,
  },
  imageContainer: {
    backgroundColor: colors.white,
    height: 120,
    width: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -60,
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 55,
    tintColor: colors.gray,
  },
  content: {
    flex: 1,
    paddingTop: 90,
    padding: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIcon: {
    height: 18,
    width: 18,
    tintColor: colors.gray,
  },
  label: {
    fontSize: 18,
    color: colors.gray,
  },
  value: {
    fontSize: 20,
    color: colors.primary,
  },
  register: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
});
