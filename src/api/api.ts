import { axiosInstance } from './servises/client';

export enum Tickers {
  bitcoin = 'bitcoin',
  ethereum = 'ethereum',
  binancecoin = 'binancecoin',
}

export enum Currencies {
  usd = 'usd',
  eur = 'eur',
}

export type PricesForTickers = {
  ticker: Tickers;
  currency: keyof typeof Currencies;
  value: number;
};

const defaultCurrency = 'usd';
const defaultTickers = ['bitcoin', 'ethereum'];
export const getPriceForTickers = async (
  tickers = defaultTickers,
  userCurrency = defaultCurrency,
): Promise<PricesForTickers[]> => {
  const stringTickers = tickers.join(',');
  const res = await axiosInstance.get(`price?ids=${stringTickers}&vs_currencies=${userCurrency}`);

  return Object.keys(res.data).map((key) => {
    const ticker = key as Tickers;
    const currency = Object.keys(res.data[key])[0] as keyof typeof Currencies;
    const value = Object.values(res.data[key])[0] as number;
    return { ticker, currency, value };
  });
};
