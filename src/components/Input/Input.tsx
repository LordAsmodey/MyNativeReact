import { IInputProps, Input as NBInput } from 'native-base';
import React from 'react';

const Input = (props: IInputProps) => (
  <NBInput
    variant="unstyled"
    h="56px"
    px="24px"
    bg="background.300"
    borderRadius="10px"
    color="textRegular"
    borderWidth="1px"
    borderColor="transparent"
    _focus={{
      borderColor: 'secondary.400',
      _hover: {
        borderColor: 'secondary.400',
      },
    }}
    _hover={{
      borderColor: 'primary.400',
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
