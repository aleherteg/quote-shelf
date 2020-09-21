import RNTextDetector from 'react-native-text-detector';

const textDetector = {
  detect: async (image) => {
    try {
      const res = await RNTextDetector.detectFromUri(image);
      return res.map((item) => item.text).join(' ');
    } catch (e) {
      //
    }
  },
};

export default textDetector;
