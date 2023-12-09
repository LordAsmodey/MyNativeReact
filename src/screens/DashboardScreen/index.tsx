import { useQueryClient } from '@tanstack/react-query';
import { Text, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

import { useCryptoCurrencyData } from '../../api/hooks/useCryptoCurrencyData';
import { CryptoCurrency } from '../../api/types/CryptoCurrency';
import SecondsCountdown from '../../components/SecondsCountdown';
import { useUser } from '../../contexts/UserContext';
import { AssetsList } from './components/AssetsList';
import { EditAssetModal } from './components/EditAssetModal';

export const DashboardScreen = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<CryptoCurrency | undefined>();

  const { nextRateUpdateTime, isFetching } = useCryptoCurrencyData();
  const { isLoading } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['UserData'] });
  }, [queryClient, modalIsOpen]);

  const selectAsset = useCallback((asset: CryptoCurrency) => {
    setSelectedAsset(asset);
  }, []);

  const onOpenModal = useCallback(() => setModalIsOpen(true), []);

  return (
    <VStack flex="1">
      <Text>{isFetching || isLoading ? 'LOADING' : 'DONE'}</Text>
      <Text>
        Rate updates in <SecondsCountdown expireTime={nextRateUpdateTime} renderer={({ timer }) => <>{timer}</>} />
      </Text>
      <AssetsList selectAsset={selectAsset} onOpenModal={onOpenModal} />
      {selectedAsset && (
        <EditAssetModal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} asset={selectedAsset} />
      )}
    </VStack>
  );
};
