import { Box, Button, FormControl, IBoxProps, Text } from 'native-base';
import React from 'react';
import { FieldError } from 'react-hook-form';

export interface IValidate {
  [key: string]: {
    rule: (value: any) => string | true;
    fixValue: any;
  };
}

interface IErrorMessageProps {
  error?: FieldError;
  validate?: IValidate;
  onChangeInput?: (newValue: any) => void;
  type?: ErrorMessageType;
  onPressFixValue?: () => void;
  containerProps?: IBoxProps;
}

export enum ErrorMessageType {
  WARNING,
  ERROR,
}

const ErrorMessage = ({
  error,
  validate,
  onChangeInput,
  type = ErrorMessageType.WARNING,
  onPressFixValue,
  containerProps = {},
}: IErrorMessageProps) => {
  const [messageStart, messageEnd, link] = (() => {
    if (error && error.message) {
      const linkStartIndex = error.message.indexOf('%');
      const linkEndIndex = error.message.lastIndexOf('%');

      if (linkStartIndex === -1) {
        return [error.message];
      }

      return [
        error.message.slice(0, linkStartIndex),
        error.message.slice(linkEndIndex + 1),
        error.message.substring(linkStartIndex + 1, linkEndIndex),
      ];
    }

    return ['', ''];
  })();

  const onPressLink = () => {
    if (onPressFixValue) {
      onPressFixValue();
    } else {
      // @ts-ignore
      onChangeInput(`${validate[error.type].fixValue}`);
    }
  };

  const color = type === ErrorMessageType.ERROR ? 'error.400' : 'secondary.400';

  return (
    <Box minHeight="28px" {...containerProps}>
      {error && (
        <FormControl.ErrorMessage mt="2px">
          <Text fontSize="md" color={color}>
            {messageStart}
          </Text>
          <Button fontSize="md" color={color} onPress={onPressLink}>
            {link}
          </Button>
          <Text fontSize="md" color={color}>
            {messageEnd}
          </Text>
        </FormControl.ErrorMessage>
      )}
    </Box>
  );
};

export default ErrorMessage;
