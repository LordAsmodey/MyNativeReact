import { Button } from 'native-base';
import React from 'react';

export const Tabs = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => (
  <Button.Group
    isAttached
    borderRadius="12px"
    borderWidth="1px"
    borderColor="background.200"
    p="3px"
    bg="background.200">
    {children}
  </Button.Group>
);
