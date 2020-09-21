import ImageCropper from 'react-native-android-image-cropper';

const options = {
  guideLines: 'on-touch',
  cropShape: 'rectangle',
  title: 'Select an image',
  cropMenuCropButtonTitle: 'Done',
};

const image = {
  select: () =>
    new Promise((resolve, reject) => {
      ImageCropper.selectImage(options, (response) => {
        if (response && response.uri) {
          resolve(response.uri);
        }
      });
    }),
};

export default image;
