import { axiosInstance } from './servises/client';
import { CryptoCurrency } from './types/CryptoCurrency';

export const getCryptoCurrencyInfo = async (): Promise<CryptoCurrency[]> => {
  const res = await axiosInstance.get('http://localhost:3000/getdata');
  return res.data;
};
