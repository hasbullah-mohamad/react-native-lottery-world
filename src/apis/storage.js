import { AsyncStorage } from 'react-native';

const StorageApi = {
  save: (key, data) => AsyncStorage.setItem(key, data),
  load: (key, data) => AsyncStorage.getItem(key, data),
  remove: key => AsyncStorage.removeItem(key)
};

export default StorageApi;
