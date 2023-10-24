import React, { createContext, useContext, useEffect, useState } from 'react';
import { StoreKeys, useStore } from '../hooks/useStore';

const DEFAULT_RATE_UPDATE_TIMEOUT_MS = 60000;
interface IUserContextProvider {
  favoriteAssets: string[];
  toggleAssetInFavorites: (asset: string) => void;
  loading: boolean;
  userSettings: {
    rateUpdateTimeout: number;
  };
}
const UserContextDefault = {
  favoriteAssets: [],
  toggleAssetInFavorites: () => undefined,
  loading: false,
  userSettings: {
    rateUpdateTimeout: DEFAULT_RATE_UPDATE_TIMEOUT_MS,
  },
};
const UserContext = createContext<IUserContextProvider>(UserContextDefault);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteAssets, setFavoriteAssets] = useState<string[]>([]);
  const { getItems, setItems, loading } = useStore();

  useEffect(() => {
    getItems(StoreKeys.favoriteAssets).then((res) => {
      if (res) {
        setFavoriteAssets(res.split(','));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleAssetInFavorites = async (asset: string) => {
    const isAssetExist = favoriteAssets.includes(asset);

    if (isAssetExist) {
      const filteredAssets = favoriteAssets.filter((item) => item !== asset);
      try {
        await setItems(StoreKeys.favoriteAssets, filteredAssets.join(','));
        setFavoriteAssets(filteredAssets);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await setItems(StoreKeys.favoriteAssets, [...favoriteAssets, asset].join(','));
        setFavoriteAssets((prev) => [...prev, asset]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const value = {
    favoriteAssets,
    toggleAssetInFavorites,
    loading,
    userSettings: {
      rateUpdateTimeout: DEFAULT_RATE_UPDATE_TIMEOUT_MS,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
