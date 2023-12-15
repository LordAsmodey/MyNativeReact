import { VStack } from 'native-base';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { LabeledInput } from './LabeledInput';

type Props = {
  control: Control<{ email: string }>;
};

export const EmailInput = ({ control }: Props) => (
  <VStack h="101px">
    <VStack>
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Email is incorrect',
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => {
          const handleOnChange = (text: string) => {
            onChange(text);
          };
          return (
            <LabeledInput
              error={error}
              onChangeText={handleOnChange}
              onSubmit={() => {}}
              {...field}
              label="Email"
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
        name="email"
      />
    </VStack>
  </VStack>
);
