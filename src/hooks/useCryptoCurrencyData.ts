import { getCryptoCurrencyInfo } from '@src/api/api';
import { useUser } from '@src/contexts/UserContext';
import { refetchOptions } from '@src/utils/reactQuery';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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
