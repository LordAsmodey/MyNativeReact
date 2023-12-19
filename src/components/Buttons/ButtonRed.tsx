import { IButtonProps } from 'native-base';
import React from 'react';

import { Button } from './Button';

export const ButtonRed = React.forwardRef<HTMLElement, IButtonProps>(
  ({ children, _text = {}, ...props }, forwardedRef) => (
    <Button
      ref={forwardedRef}
      variant="unstyled"
      bg="secondary"
      borderWidth="1px"
      borderColor="transparent"
      _text={{
        color: 'textBlack',
        fontSize: 'lg',
        lineHeight: '18px',
        ..._text,
      }}
      _disabled={{
        _text: {
          color: 'textDisabled',
        },
        bg: 'background.300',
        opacity: 1,
      }}
      {...props}>
      {children}
    </Button>
  ),
);
