import { VStack } from 'native-base';
import React, { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <VStack flex="1" bg="background.100">
      {children}
    </VStack>
  );
};
