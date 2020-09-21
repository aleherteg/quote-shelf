import {StyleSheet} from 'react-native';

import colors from '../../themes/colors';
import {SCREEN_HEIGHT} from '../../utils/metrics';

export default StyleSheet.create({
  base: {
    flex: 1,
    padding: 20,
  },
  content: {
    flexGrow: 1,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 6,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    height: SCREEN_HEIGHT / 3,
    textAlignVertical: 'top',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 25,
  },
  pageNumberContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: colors.secondary,
    fontSize: 16,
  },
  pageInput: {
    width: '50%',
    backgroundColor: colors.white,
    borderRadius: 6,
    elevation: 5,
    padding: 0,
    paddingHorizontal: 15,
    fontSize: 16,
    textAlignVertical: 'center',
    height: 40,
  },
  selectBookContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBook: {
    backgroundColor: colors.white,
    borderRadius: 6,
    elevation: 5,
    flexGrow: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 40,
  },
  selectBookText: {
    fontSize: 16,
  },
  placeholder: {
    color: colors.gray,
  },
});
