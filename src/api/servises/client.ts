import { API_URL, API_URL_ANDROID } from '@env';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Platform } from 'react-native';

import { tokenService } from './tokenService';

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
      if (tokenService.hasToken()) {
        try {
          config.headers.Authorization = `Bearer ${tokenService.getToken()}`;
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
          // TODO: Set newAccessToken
          // const {
          //   data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
          // } = await userApi.usersControllerRefreshToken({ refreshToken });
          //
          // tokenService.setTokens(newAccessToken, newRefreshToken);
          // return await axios.request({
          //   ...error.config,
          //   headers: {
          //     ...error.config.headers,
          //     Authorization: `Bearer ${newAccessToken}`,
          //   },
          // });
        } catch {
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
