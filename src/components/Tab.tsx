import { Text } from 'native-base';
import React from 'react';

import { Button } from './Buttons';

interface ITabProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
}
export const Tab = ({ title, isActive, onPress }: ITabProps): JSX.Element => {
  return (
    <Button
      onPress={onPress}
      variant="unstyled"
      flexGrow="1"
      height="45px"
      borderRadius="12px"
      borderColor="transparent"
      borderWidth="1px"
      background={isActive ? 'background.100' : 'transparent'}
      color={isActive ? 'white' : 'textRegular'}>
      <Text fontFamily="body" fontWeight="400" fontSize="md" color={isActive ? 'textRegular' : 'textDisabled'}>
        {title}
      </Text>
    </Button>
  );
};

Tab.defaultProps = {
  isActive: false,
};
