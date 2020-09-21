import AsyncStorage from '@react-native-community/async-storage';

const storage = {
  store: async (key, value) => {
    try {
      if (value == null) {
        throw new Error('No value');
      }
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (err) {
      return null;
    }
  },

  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  },
};

export default storage;
