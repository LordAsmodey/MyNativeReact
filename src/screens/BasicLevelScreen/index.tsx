import { Image, Pressable, ScrollView, Text, VStack } from 'native-base';
import React from 'react';

import { useCryptoCurrencyData } from '../../api/hooks/useCryptoCurrencyData';
import SecondsCountdown from '../../components/SecondsCountdown';
import { useUser } from '../../contexts/UserContext';

export const BasicLevelScreen = () => {
  const { data, nextRateUpdateTime, isFetching } = useCryptoCurrencyData();
  const { toggleAssetInFavorites, isLoading, userData } = useUser();

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
                onPress={() => toggleAssetInFavorites(item.id)}
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
    </VStack>
  );
};
