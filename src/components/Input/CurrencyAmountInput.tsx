import React from 'react';
import { Control, Controller } from 'react-hook-form';

import LabeledInput from './LabeledInput';

type Props = {
  control: Control<any>;
  label: string;
  name: string;
};

export const CurrencyAmountInput = ({ control, label, name }: Props) => {
  return (
    <Controller
      control={control}
      rules={{
        required: 'Price is required',
        pattern: {
          value: /^[0-9]+(\.[0-9]+)?$/,
          message: 'Value is incorrect',
        },
      }}
      // We need to pull out the ref for the hook forms to work correctly.
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => {
        const handleOnChange = (text: string) => {
          onChange(text);
        };
        return (
          <LabeledInput
            w="100%"
            bg="gray.200"
            color="black"
            error={error}
            onChangeText={handleOnChange}
            onSubmit={() => {}}
            {...field}
            label={label}
            keyboardType="numeric"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            labelTextProps={{
              color: 'black',
              fontSize: 'md',
            }}
            h="56px"
            fontSize="lg"
          />
        );
      }}
      name={name}
    />
  );
};
