import React from 'react';
import { Control } from 'react-hook-form';

import { CurrencyAmountInput } from './CurrencyAmountInput';

export enum InputType {
  MIN = 'min',
  MAX = 'max',
}

const inputFields = {
  [InputType.MIN]: {
    Component: CurrencyAmountInput,
    name: 'minAssetPrice',
    label: 'Input min price',
  },
  [InputType.MAX]: {
    Component: CurrencyAmountInput,
    name: 'maxAssetPrice',
    label: 'Input max price',
  },
};

type Props = {
  control: Control<any>;
  activeInputTypes: { type: InputType }[];
};
export const RangeCurrencyInput = ({ control, activeInputTypes }: Props) => {
  return (
    <>
      {activeInputTypes.map((item) => {
        const { Component, name, label } = inputFields[item.type];
        return <Component key={item.type} label={label} control={control} name={name} />;
      })}
    </>
  );
};
