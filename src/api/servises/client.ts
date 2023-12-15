import { API_URL, API_URL_ANDROID } from '@env';
import { updateAccessToken } from '@src/api/api';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Platform } from 'react-native';

import { tokenService } from './tokenService';

// It's for only localhost testing. In production will use API_URL only.
const baseUrl = Platform.OS === 'ios' ? API_URL : API_URL_ANDROID;

// Implementation of a client service to add tokens to the request body and
// intercept the server response if the user is not authorized. Will be used in the future.
export const UnauthorizedExceptionDtoErrorEnum = {
  UnprocessableEntity: 'UNPROCESSABLE_ENTITY',
  TokenExpired: 'TOKEN_EXPIRED',
  InvalidateSession: 'INVALIDATE_SESSION',
  Unauthorized: 'UNAUTHORIZED',
} as const;
const createAxiosInstance = (): AxiosInstance => {
  const hewInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  hewInstance.interceptors.request.use(
    async (config) => {
      if (await tokenService.hasToken()) {
        try {
          config.headers.Authorization = `Bearer ${await tokenService.getToken()}`;
        } catch (e) {
          console.error(e);
        }
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return hewInstance;
};

export const axiosInstance: AxiosInstance = createAxiosInstance();

const logout = () => {
  tokenService.removeTokens();
  console.log('Logout');
};

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response && error.response.status === 401) {
    // @ts-ignore
    switch (error.response.data.error) {
      case UnauthorizedExceptionDtoErrorEnum.TokenExpired: {
        try {
          const refreshToken = (await tokenService.getRefreshToken()) as string;
          if (!refreshToken) {
            throw new Error('Refresh token not found');
          }
          const newTokens = await updateAccessToken({
            refreshToken,
          });
          if (newTokens) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;
            tokenService.setTokens(newAccessToken, newRefreshToken);
            return await axios.request({
              ...error.config,
              headers: {
                ...error?.config?.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
          }
        } catch (e) {
          console.error(e);
          logout();
        }
        break;
      }
      case UnauthorizedExceptionDtoErrorEnum.UnprocessableEntity:
      case UnauthorizedExceptionDtoErrorEnum.Unauthorized:
      case UnauthorizedExceptionDtoErrorEnum.InvalidateSession: {
        logout();
        break;
      }
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(onResponse, onResponseError);
