import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  base: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.primary,
    fontSize: 20,
  },
  editButton: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  editIcon: {
    height: 18,
    width: 18,
    tintColor: colors.gray,
  },
  item: {
    flexDirection: 'row',
    borderColor: colors.secondary,
    borderRadius: 6,
    backgroundColor: colors.white,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
    padding: 10,
  },
  author: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
