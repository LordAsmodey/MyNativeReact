import { axiosInstance } from './servises/client';
import { CryptoCurrency } from './types/CryptoCurrency';

export const getCryptoCurrencyInfo = async (): Promise<CryptoCurrency[]> => {
  const res = await axiosInstance.get(
    'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false',
  );
  return res.data;
};
