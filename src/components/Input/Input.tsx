import { IInputProps, Input as NBInput } from 'native-base';
import React from 'react';

const Input = (props: IInputProps) => (
  <NBInput
    variant="unstyled"
    h="54px"
    px="24px"
    bg="background.200"
    borderRadius="12px"
    color="textRegular"
    borderWidth="1px"
    borderColor="transparent"
    _focus={{
      borderColor: 'textRegular',
      bg: 'background.200',
    }}
    _disabled={{
      opacity: 1,
      background: 'background.600',
      borderColor: 'borderPurple',
      color: 'textDisabled',
    }}
    _invalid={{
      borderColor: 'error.400',
      _hover: {
        borderColor: 'error.400',
        _focus: {
          borderColor: 'error.400',
        },
      },
      _focus: {
        borderColor: 'error.400',
      },
    }}
    {...props}
  />
);

export default Input;
