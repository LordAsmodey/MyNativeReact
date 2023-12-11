import { deleteFavoriteAsset, editFavoriteAssets } from '@src/api/api';
import { InputType, ModalBase, RangeCurrencyInput } from '@src/components/';
import { useUser } from '@src/contexts/UserContext';
import { CryptoCurrency } from '@src/types/CryptoCurrency';
import { Button, HStack, Image, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const activeInputTypes = [{ type: InputType.MIN }, { type: InputType.MAX }];

type Props = {
  asset: CryptoCurrency;
  isOpen: boolean;
  closeModal: () => void;
};

export const EditAssetModal = ({ isOpen, closeModal, asset }: Props) => {
  const { userData } = useUser();

  const isFavoriteAsset = userData.favoriteAssets.some((item) => item.id === asset.id);

  const { control, setError, setValue } = useForm({
    defaultValues: {
      minAssetPrice: '0',
      maxAssetPrice: '0',
    },
    mode: 'onBlur',
  });

  const [minAssetPrice, maxAssetPrice] = useWatch({
    control,
    name: ['minAssetPrice', 'maxAssetPrice'],
  });

  useEffect(() => {
    if (isFavoriteAsset) {
      userData.favoriteAssets.forEach((item) => {
        if (item.id === asset.id) {
          setValue('minAssetPrice', item.minPrice.toString());
          setValue('maxAssetPrice', item.maxPrice.toString());
        }
      });
    } else {
      setValue('minAssetPrice', asset.current_price.toString());
      setValue('maxAssetPrice', asset.current_price.toString());
    }
  }, [asset.current_price, asset.id, isFavoriteAsset, setValue, userData.favoriteAssets]);

  const onSubmit = async () => {
    const maxPrice = Number(maxAssetPrice);
    const minPrice = Number(minAssetPrice);
    try {
      if (maxPrice && minPrice) {
        await editFavoriteAssets({ id: asset.id, maxPrice, minPrice });
        closeModal();
      }
    } catch (e) {
      // TODO: Add toaster
      setError('minAssetPrice', { message: 'Error' });
      setError('maxAssetPrice', { message: 'Error' });
      console.error(e);
    }
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
        <RangeCurrencyInput control={control} activeInputTypes={activeInputTypes} />
        <HStack w="100%" justifyContent="space-between">
          <Button onPress={closeModal}>Cancel</Button>
          <Button onPress={onSubmit}>Confirm</Button>
          <Button onPress={onDeletePress}>Delete notification</Button>
        </HStack>
      </VStack>
    </ModalBase>
  );
};
