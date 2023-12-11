import { getUserInfo } from '@src/api/api';
import { User } from '@src/types/User';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

const DEFAULT_RATE_UPDATE_TIMEOUT_MS = 20000;

interface IUserContextProvider {
  userData: User;
  toggleAssetInFavorites: (asset: string) => void;
  isLoading: boolean;
  userSettings: {
    rateUpdateTimeout: number;
  };
}
const UserContextDefault = {
  userData: {} as User,
  toggleAssetInFavorites: () => undefined,
  isLoading: false,
  userSettings: {
    rateUpdateTimeout: DEFAULT_RATE_UPDATE_TIMEOUT_MS,
  },
};
const UserContext = createContext<IUserContextProvider>(UserContextDefault);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteAssets, setFavoriteAssets] = useState<string[]>([]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['UserData'],
    queryFn: async () => {
      return await getUserInfo();
    },
  });

  const toggleAssetInFavorites = async (asset: string) => {
    const isAssetExist = favoriteAssets.includes(asset);

    if (isAssetExist) {
      const filteredAssets = favoriteAssets.filter((item) => item !== asset);
      try {
        setFavoriteAssets(filteredAssets);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        setFavoriteAssets((prev) => [...prev, asset]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const value = {
    userData,
    toggleAssetInFavorites,
    isLoading,
    userSettings: {
      rateUpdateTimeout: DEFAULT_RATE_UPDATE_TIMEOUT_MS,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
