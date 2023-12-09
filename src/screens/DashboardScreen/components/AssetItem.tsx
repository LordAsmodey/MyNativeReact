import { Image, Pressable, Text } from 'native-base';
import React, { memo } from 'react';

import { CryptoCurrency } from '../../../api/types/CryptoCurrency';
import { useUser } from '../../../contexts/UserContext';

type Props = {
  asset: CryptoCurrency;
  onOpenModal: () => void;
  selectAsset: (asset: CryptoCurrency) => void;
};
export const AssetItem = memo(({ asset, selectAsset, onOpenModal }: Props) => {
  const { userData } = useUser();
  const isSelected = userData?.favoriteAssets.some((item) => item.id === asset.id);

  const onAssetPressHandler = (selectedAsset: CryptoCurrency) => {
    selectAsset(selectedAsset);
    onOpenModal();
  };

  return (
    <Pressable
      onPress={() => onAssetPressHandler(asset)}
      h="56px"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      key={asset.id}
      bg={isSelected ? 'red.400' : 'blue.300'}
      p="8px"
      mb="8px">
      <Text>
        {asset.name} - {asset.current_price} USD
      </Text>
      <Image w="40px" h="40px" src={asset.image} alt="image" />
    </Pressable>
  );
});
