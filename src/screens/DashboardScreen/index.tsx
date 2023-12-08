import { useQueryClient } from '@tanstack/react-query';
import { FlatList, Image, Pressable, Text, VStack } from 'native-base';
import React, { memo, useEffect, useState } from 'react';

import { useCryptoCurrencyData } from '../../api/hooks/useCryptoCurrencyData';
import { CryptoCurrency } from '../../api/types/CryptoCurrency';
import SecondsCountdown from '../../components/SecondsCountdown';
import { useUser } from '../../contexts/UserContext';
import { EditAssetModal } from '../WelcomeScreen/components/EditAssetModal';

export const DashboardScreen = () => {
  const { data, nextRateUpdateTime, isFetching } = useCryptoCurrencyData();
  const { isLoading, userData } = useUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<CryptoCurrency | undefined>();
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState<CryptoCurrency[] | undefined>([]);
  const pageSize = 20;
  const queryClient = useQueryClient();

  useEffect(() => {
    setVisibleData(data?.slice(0, page * pageSize));
  }, [data, page]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['UserData'] });
  }, [queryClient, modalIsOpen]);

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = ({ item }: { item: CryptoCurrency }) => {
    const isSelected = userData?.favoriteAssets.some((asset) => asset.id === item.id);

    return (
      <Pressable
        onPress={() => {
          setModalIsOpen(true);
          setSelectedAsset(item);
        }}
        h="56px"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        key={item.id}
        bg={isSelected ? 'red.400' : 'blue.300'}
        p="8px"
        mb="8px">
        <Text>
          {item.name} - {item.current_price} USD
        </Text>
        <Image w="40px" h="40px" src={item.image} alt="image" />
      </Pressable>
    );
  };

  const MemoizedRenderItem = memo(renderItem);
  const keyExtractor = (item: CryptoCurrency) => item.id;

  return (
    <VStack flex="1">
      <Text>{isFetching || isLoading ? 'LOADING' : 'DONE'}</Text>
      <Text>
        Rate updates in <SecondsCountdown expireTime={nextRateUpdateTime} renderer={({ timer }) => <>{timer}</>} />
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={visibleData}
        renderItem={({ item }) => <MemoizedRenderItem item={item} />}
        getItemLayout={(_, index) => ({ length: 56, offset: 56 * index, index })}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={3}
        keyExtractor={keyExtractor}
      />
      {selectedAsset && (
        <EditAssetModal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} asset={selectedAsset} />
      )}
    </VStack>
  );
};
