import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

export default StyleSheet.create({
  base: {
    flex: 1,
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
  list: {
    flex: 1,
  },
  iconStyle: {
    height: 18,
    width: 18,
  },
  topBar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  sortIcon: {
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quoteContainer: {
    padding: 10,
    borderColor: colors.secondary,
    borderRadius: 6,
    backgroundColor: colors.white,
    elevation: 5,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    paddingRight: 50,
  },
  pageText: {
    fontSize: 16,
    alignSelf: 'flex-end',
    color: colors.gray,
  },
  favoriteButton: {
    padding: 10,
    position: 'absolute',
    right: 30,
    top: 0,
    zIndex: 1,
  },
  favoriteImage: {
    tintColor: 'red',
    width: 20,
    height: 20,
  },
  closeButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  closeImage: {
    width: 18,
    height: 18,
    tintColor: colors.secondary,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    backgroundColor: colors.white,
  },
  searchInputContainer: {
    backgroundColor: colors.white,
  },
  icon: {
    color: colors.primary,
  },
  searchText: {
    color: colors.gray,
  },
});
