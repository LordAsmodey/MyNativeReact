import { Button, HStack, Image, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';

import { deleteFavoriteAsset, editFavoriteAssets } from '../../../api/api';
import { CryptoCurrency } from '../../../api/types/CryptoCurrency';
import LabeledInput from '../../../components/Input/LabeledInput';
import ModalBase from '../../../components/ModelBase';
import { useUser } from '../../../contexts/UserContext';

type Props = {
  asset: CryptoCurrency;
  isOpen: boolean;
  closeModal: () => void;
};

export const EditAssetModal = ({ isOpen, closeModal, asset }: Props) => {
  const [minPrice, setMinPrice] = useState<string | undefined>('0');
  const [maxPrice, setMaxPrice] = useState<string | undefined>('0');
  const { userData } = useUser();

  const isFavoriteAsset = userData.favoriteAssets.some((item) => item.id === asset.id);

  useEffect(() => {
    if (isFavoriteAsset) {
      userData.favoriteAssets.forEach((item) => {
        if (item.id === asset.id) {
          setMinPrice(item.minPrice?.toString());
          setMaxPrice(item.maxPrice?.toString());
        }
      });
    } else {
      setMinPrice(asset.current_price.toString());
      setMaxPrice(asset.current_price.toString());
    }
  }, [asset.current_price, asset.id, isFavoriteAsset, userData.favoriteAssets]);

  const onConfirmPress = () => {
    const maxPriceValue = maxPrice ? +maxPrice : 0;
    const minPriceValue = minPrice ? +minPrice : 0;
    editFavoriteAssets({ id: asset.id, maxPrice: maxPriceValue, minPrice: minPriceValue });
    closeModal();
  };

  const onDeletePress = () => {
    if (isFavoriteAsset) {
      deleteFavoriteAsset({ id: asset.id });
      closeModal();
    }
  };

  return (
    <ModalBase isOpen={isOpen}>
      <VStack h="100%" w="100%" px="24px" bg="blue.200" alignItems="center" justifyContent="center">
        <Text fontSize="lg">{asset.name}</Text>
        <Image my="16px" w="40px" h="40px" src={asset.image} alt="image" />
        <Text>Configuring notifications for {asset.name}</Text>
        <LabeledInput value={minPrice} label="Input min price" bg="gray.200" color="black" />
        <LabeledInput value={maxPrice} label="Input max price" bg="gray.200" color="black" />
        <HStack w="100%" justifyContent="space-between">
          <Button onPress={closeModal}>Cancel</Button>
          <Button onPress={onConfirmPress}>Confirm</Button>
          <Button onPress={onDeletePress}>Delete notification</Button>
        </HStack>
      </VStack>
    </ModalBase>
  );
};
