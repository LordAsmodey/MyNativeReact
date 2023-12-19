import { LabeledInput } from '@src/components/';
import { VStack } from 'native-base';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<{ password: string }>;
};

export const PasswordInput = ({ control }: Props) => (
  <VStack h="110px">
    <VStack>
      <Controller
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must contain min 6 characters',
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
              label="Password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              spellCheck={false}
              labelTextProps={{
                color: 'textLabel',
                fontSize: 'md',
              }}
              fontSize="md"
              placeholder="Enter your password"
              placeholderTextColor="textDisabled"
              type="password"
            />
          );
        }}
        name="password"
      />
    </VStack>
  </VStack>
);
