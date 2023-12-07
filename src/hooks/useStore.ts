import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const StoreKeys = {
  favoriteAssets: 'favoriteAssets',
};

export const useStore = () => {
  const [loading, setLoading] = useState(false);
  const setItems = async (key: string, items: string) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem(key, items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getItems = async (key: string) => {
    setLoading(true);
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteItems = async (key: string) => {
    setLoading(true);
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    setItems,
    getItems,
    deleteItems,
    loading,
  };
};
