import { Image, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { useCryptoCurrencyData } from '../../api/hooks/useCryptoCurrencyData';
import SecondsCountdown from '../../components/SecondsCountdown';

export const BasicLevelScreen = () => {
  const { data, nextRateUpdateTime, isFetching } = useCryptoCurrencyData();
  return (
    <VStack flex={1}>
      <Text>{isFetching ? 'LOADING' : 'DONE'}</Text>
      <Text>
        Rate updates in <SecondsCountdown expireTime={nextRateUpdateTime} renderer={({ timer }) => <>{timer}</>} />
      </Text>
      <ScrollView>
        {data ? (
          data?.map((item) => (
            <VStack key={item.id}>
              <Text>
                {item.name} - {item.current_price} USD
              </Text>
              <Image w="40px" h="40px" src={item.image} alt="image" />
            </VStack>
          ))
        ) : (
          <Text>No data!</Text>
        )}
      </ScrollView>
    </VStack>
  );
};
