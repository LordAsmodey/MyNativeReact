import { IModalProps, Modal } from 'native-base';
import React from 'react';

export const ModalBase = ({ children, ...rest }: IModalProps) => (
  <Modal isOpen={true} h="100%" {...rest}>
    {children}
  </Modal>
);
