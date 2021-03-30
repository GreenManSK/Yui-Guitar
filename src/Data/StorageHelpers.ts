import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromStorage = (
  key: string,
  setter: (data: any) => void,
  defaultValue: any
) => {
  AsyncStorage.getItem(key).then((data) => {
    setter(data ? JSON.parse(data) : defaultValue);
  });
};

export const putToStorage = (key: string, data: any) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};
