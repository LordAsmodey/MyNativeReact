import { Button as NBButton, IButtonProps } from 'native-base';
import React, { forwardRef } from 'react';

export const Button = forwardRef<HTMLElement, IButtonProps>(({ children, ...rest }, forwardedRef) => (
  <NBButton
    borderRadius="16px"
    h="54px"
    // @ts-ignore
    ref={(r) => {
      if (forwardedRef) {
        // @ts-ignore
        forwardedRef.current = r;
      }
    }}
    {...rest}>
    {children}
  </NBButton>
));
