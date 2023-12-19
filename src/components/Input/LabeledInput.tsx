import { FormControl, IFormControlProps, IInputProps, ITextProps, Text } from 'native-base';
import React from 'react';
import { FieldError } from 'react-hook-form/dist/types/errors';

import ErrorMessage, { ErrorMessageType } from '../ErrorMessage';
import Input from './Input';

export const LabeledInput = ({
  label,
  formControlProps = {},
  error,
  labelTextProps = {},
  onSubmit,
  hideError = false,
  ...props
}: {
  label: string;
  formControlProps?: IFormControlProps;
  inputProps?: IInputProps;
  error?: FieldError;
  labelTextProps?: ITextProps;
  onSubmit?: () => void;
  hideError?: boolean;
} & IInputProps): JSX.Element => {
  const onKeyPress = (e: any) => {
    if (e.keyCode === 13 && onSubmit) {
      onSubmit();
    }
  };

  return (
    <FormControl isInvalid={!!error} {...formControlProps}>
      <FormControl.Label mb="-2px">
        <Text {...labelTextProps}>{label}</Text>
      </FormControl.Label>
      <Input
        onKeyPress={onKeyPress}
        type="text"
        mt="10px"
        color="lightText"
        py="13px"
        px="24px"
        borderWidth="1px"
        {...props}
      />
      {!hideError && <ErrorMessage error={error} type={ErrorMessageType.ERROR} />}
    </FormControl>
  );
};
