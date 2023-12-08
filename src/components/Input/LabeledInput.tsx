import { FormControl, IFormControlProps, IInputProps, ITextProps, Text } from 'native-base';
import React from 'react';
import { FieldError } from 'react-hook-form/dist/types/errors';

import ErrorMessage, { ErrorMessageType } from '../ErrorMessage';
import Input from './Input';

const LabeledInput = ({
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
      <FormControl.Label mb="0">
        <Text {...labelTextProps}>{label}</Text>
      </FormControl.Label>
      <Input
        onKeyPress={onKeyPress}
        type="text"
        mt="6px"
        mb="-4px"
        color="lightText"
        py="13px"
        px="24px"
        borderWidth="1px"
        h="56px"
        {...props}
      />
      {!hideError && <ErrorMessage error={error} type={ErrorMessageType.ERROR} />}
    </FormControl>
  );
};

export default LabeledInput;