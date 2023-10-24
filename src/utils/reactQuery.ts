import { AxiosError } from 'axios';

export const refetchOptions = (refetchInterval: number) => ({
  refetchInterval,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
});

export const cacheRequestOption = {
  cacheTime: 1000 * 60 * 60 * 24,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: (_failureCount: number, error: AxiosError) => {
    if (error?.response?.status === 401) {
      return false;
    }

    return true;
  },
};
