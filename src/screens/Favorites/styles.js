import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  base: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 20,
  },
  quoteContainer: {
    padding: 10,
    borderColor: colors.secondary,
    borderRadius: 6,
    backgroundColor: colors.white,
    elevation: 5,
  },
  favoriteButton: {
    padding: 4,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  favoriteImage: {
    tintColor: 'red',
    width: 25,
    height: 25,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.primary,
    fontSize: 20,
  },
});
