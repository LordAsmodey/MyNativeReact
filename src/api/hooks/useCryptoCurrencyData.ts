import { useQuery } from '@tanstack/react-query';
import { getCryptoCurrencyInfo } from '../api';
import { refetchOptions } from '../../utils/reactQuery';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
export const useCryptoCurrencyData = () => {
  const [nextRateUpdateTime, setNextRateUpdateTime] = useState(0);
  const {
    userSettings: { rateUpdateTimeout },
  } = useUser();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['CryptoCurrencyData'],
    queryFn: async () => {
      const cryptoCurrencyInfo = await getCryptoCurrencyInfo();
      setNextRateUpdateTime(Date.now() + rateUpdateTimeout);
      return cryptoCurrencyInfo;
    },
    ...refetchOptions(rateUpdateTimeout),
  });
  return { data, isLoading, isFetching, nextRateUpdateTime };
};
