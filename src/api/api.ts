import { axiosInstance } from './servises/client';
import { CryptoCurrency } from './types/CryptoCurrency';

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
}) => {
  try {
    const res = await axiosInstance.post('/register', { email, password, deviceId });
    console.log(res.data);
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
