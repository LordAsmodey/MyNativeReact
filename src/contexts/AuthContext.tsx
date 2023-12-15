import { getUserInfo } from '@src/api/api';
import { tokenService } from '@src/api/servises/tokenService';
import { User } from '@src/types/User';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const DEFAULT_RATE_UPDATE_TIMEOUT_MS = 20000;

interface IUserContextProvider {
  userData: User;
  accessToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  isLoading: boolean;
  userSettings: {
    rateUpdateTimeout: number;
  };
}
const UserContextDefault = {
  userData: {} as User,
  accessToken: null,
  setTokens: () => {},
  isLoading: false,
  userSettings: {
    rateUpdateTimeout: DEFAULT_RATE_UPDATE_TIMEOUT_MS,
  },
};
const AuthContext = createContext<IUserContextProvider>(UserContextDefault);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await tokenService.getToken();
        setAccessToken(token);
      } catch (e) {
        console.error(e);
      }
    };
    getToken();
  }, []);

  const setTokens = useCallback(
    (tokens: { accessToken: string; refreshToken: string }) => {
      tokenService.setTokens(tokens.accessToken, tokens.refreshToken);
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    },
    [setAccessToken, setRefreshToken],
  );

  const { data: userData, isLoading } = useQuery({
    queryKey: ['UserData'],
    queryFn: async () => {
      return await getUserInfo();
    },
  });

  const value = {
    userData,
    accessToken,
    isLoading,
    setTokens,
    userSettings: {
      rateUpdateTimeout: DEFAULT_RATE_UPDATE_TIMEOUT_MS,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
