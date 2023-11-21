import { IModalProps, Modal } from 'native-base';
import React from 'react';

const ModalBase = ({ children, ...rest }: IModalProps) => (
  <Modal isOpen={true} h="100%" {...rest}>
    {children}
  </Modal>
);

export default ModalBase;
