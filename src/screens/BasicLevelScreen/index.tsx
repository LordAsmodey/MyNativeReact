import { Image, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';

import { useCryptoCurrencyData } from '../../api/hooks/useCryptoCurrencyData';
import { CryptoCurrency } from '../../api/types/CryptoCurrency';
import SecondsCountdown from '../../components/SecondsCountdown';
import { useUser } from '../../contexts/UserContext';
import { EditAssetModal } from '../WelcomeScreen/components/EditAssetModal';

export const BasicLevelScreen = () => {
  const { data, nextRateUpdateTime, isFetching } = useCryptoCurrencyData();
  const { isLoading, userData } = useUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<CryptoCurrency | undefined>();

  return (
    <VStack flex="1">
      <Text>{isFetching || isLoading ? 'LOADING' : 'DONE'}</Text>
      <Text>
        Rate updates in <SecondsCountdown expireTime={nextRateUpdateTime} renderer={({ timer }) => <>{timer}</>} />
      </Text>
      <ScrollView>
        {data ? (
          data.map((item) => {
            const isSelected = userData?.favoriteAssets.some((asset) => asset.id === item.id);
            return (
              <Pressable
                onPress={() => {
                  setModalIsOpen(true);
                  setSelectedAsset(item);
                }}
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
          })
        ) : (
          <Text>No data!</Text>
        )}
      </ScrollView>
      {selectedAsset && (
        <EditAssetModal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} asset={selectedAsset} />
      )}
    </VStack>
  );
};
