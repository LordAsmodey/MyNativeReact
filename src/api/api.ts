import { CryptoCurrency } from '@src/types/CryptoCurrency';
import { FavoriteAsset } from '@src/types/User';

import { axiosInstance } from './servises/client';

export const getCryptoCurrencyInfo = async (): Promise<CryptoCurrency[] | undefined> => {
  try {
    const res = await axiosInstance.get('/getdata');
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const registerNewUser = async ({
  email,
  password,
  deviceId,
}: {
  email: string;
  password: string;
  deviceId: string;
}): Promise<{ accessToken: string; refreshToken: string } | undefined> => {
  try {
    const res = await axiosInstance.post('/register', { email, password, deviceId });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const authUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string } | undefined> => {
  try {
    const res = await axiosInstance.post('/auth', { email, password });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUserInfo = async () => {
  try {
    const res = await axiosInstance.get('/getUserInfo');
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const editFavoriteAssets = async ({ id, maxPrice, minPrice }: FavoriteAsset) => {
  try {
    const res = await axiosInstance.put('/editFavoriteAssets', { id, maxPrice, minPrice });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const deleteFavoriteAsset = async ({ id }: { id: string }) => {
  try {
    const res = await axiosInstance.delete('/deleteFavoriteAsset', { data: { id } });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<{ accessToken: string; refreshToken: string } | undefined> => {
  try {
    const res = await axiosInstance.post('/updateAccessToken', { refreshToken });
    return res.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
