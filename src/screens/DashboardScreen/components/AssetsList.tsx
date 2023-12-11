import { useCryptoCurrencyData } from '@src/hooks/useCryptoCurrencyData';
import { CryptoCurrency } from '@src/types/CryptoCurrency';
import { FlatList, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';

import { AssetItem } from './AssetItem';

const pageSize = 20;

type Props = {
  onOpenModal: () => void;
  selectAsset: (asset: CryptoCurrency) => void;
};
export const AssetsList = ({ onOpenModal, selectAsset }: Props) => {
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState<CryptoCurrency[] | undefined>([]);
  const { data } = useCryptoCurrencyData();

  useEffect(() => {
    setVisibleData(data?.slice(0, page * pageSize));
  }, [data, page]);
  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const renderLoader = () => <Spinner />;
  const keyExtractor = (item: CryptoCurrency) => item.id;
  const getItemLayout = (_: ArrayLike<CryptoCurrency> | null | undefined, index: number) => ({
    length: 64,
    offset: 64 * index,
    index,
  });

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={visibleData}
      renderItem={({ item }) => <AssetItem asset={item} selectAsset={selectAsset} onOpenModal={onOpenModal} />}
      getItemLayout={getItemLayout}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      removeClippedSubviews={true}
      maxToRenderPerBatch={20}
      windowSize={3}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderLoader}
    />
  );
};
