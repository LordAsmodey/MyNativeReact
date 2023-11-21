// Implementation of a token service for working with authorization.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS: {
  ACCESS: string;
  REFRESH: string;
} = {
  ACCESS: '__access_token',
  REFRESH: '__refresh_token',
};

export const tokenService = {
  getToken(): string | null {
    return '123';
    //return AsyncStorage.getItem(KEYS.ACCESS);
  },

  hasToken(): boolean {
    return true;
    //return !!(await AsyncStorage.getItem(KEYS.ACCESS));
  },

  getRefreshToken() {
    return AsyncStorage.getItem(KEYS.REFRESH);
  },

  hasRefreshToken() {
    return AsyncStorage.getItem(KEYS.REFRESH) !== undefined;
  },

  setTokens(accessToken: string, refreshToken: string) {
    AsyncStorage.setItem(KEYS.ACCESS, accessToken);
    AsyncStorage.setItem(KEYS.REFRESH, refreshToken);
  },

  removeTokens() {
    AsyncStorage.removeItem(KEYS.ACCESS);
    AsyncStorage.removeItem(KEYS.REFRESH);
  },
};
