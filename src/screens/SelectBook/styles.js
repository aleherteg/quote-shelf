import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

export default StyleSheet.create({
  base: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 6,
  },
  searchInputContainer: {
    backgroundColor: colors.white,
  },
  searchIcon: {
    color: colors.primary,
  },
  bookContainer: {
    padding: 10,
    borderColor: colors.secondary,
    borderRadius: 6,
    backgroundColor: colors.white,
    elevation: 5,
  },
  bookTitleText: {
    fontSize: 16,
    color: colors.black,
    fontStyle: 'italic',
  },
  bookAuthorText: {
    fontSize: 14,
    color: colors.gray,
  },
});
