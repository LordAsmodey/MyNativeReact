import { useQuery } from '@tanstack/react-query';
import { getCryptoCurrencyInfo } from '../api';
import { refetchOptions } from '../../utils/reactQuery';
import { useState } from 'react';

const RATE_UPDATE_TIMEOUT_MS = 60000;
export const useCryptoCurrencyData = () => {
  const [nextRateUpdateTime, setNextRateUpdateTime] = useState(0);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['CryptoCurrencyData'],
    queryFn: async () => {
      const cryptoCurrencyInfo = await getCryptoCurrencyInfo();
      setNextRateUpdateTime(Date.now() + RATE_UPDATE_TIMEOUT_MS);
      return cryptoCurrencyInfo;
    },
    ...refetchOptions(RATE_UPDATE_TIMEOUT_MS),
  });
  return { data, isLoading, isFetching, nextRateUpdateTime };
};
