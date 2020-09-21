import {Alert} from 'react-native';

export const showError = (mesage = '') => {
  Alert.alert(
    'Error',
    mesage,
    [
      {
        text: 'Ok',
      },
    ],
    {cancelable: false},
  );
};
