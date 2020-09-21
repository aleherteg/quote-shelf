import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';

export default StyleSheet.create({
  base: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparentBlack,
  },
  buttonsContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  button: {
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.black,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
