import { Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { getPriceForTickers, PricesForTickers } from '../../api/api';

export const BasicLevelScreen = () => {
  const [prices, setPrices] = useState<PricesForTickers[]>([]);
  useEffect(() => {
    getPriceForTickers().then((res) => setPrices(res));
  }, []);
  return (
    <VStack>
      <Text>BasicLevelScreen</Text>
      {prices.map((price) => (
        <VStack key={price.ticker}>
          <Text>
            {price.ticker} - {price.value} {price.currency}
          </Text>
        </VStack>
      ))}
    </VStack>
  );
};
