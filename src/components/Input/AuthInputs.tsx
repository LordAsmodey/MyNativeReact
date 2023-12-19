import React from 'react';
import { Control } from 'react-hook-form';

import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';

export enum AuthInputType {
  Email = 'email',
  Password = 'password',
}

const inputFields = {
  [AuthInputType.Email]: {
    Component: EmailInput,
    name: AuthInputType.Email,
  },
  [AuthInputType.Password]: {
    Component: PasswordInput,
    name: AuthInputType.Password,
  },
};

type Props = {
  control: Control<any>;
  activeInputTypes: { type: AuthInputType }[];
};
export const AuthInputs = ({ control, activeInputTypes }: Props) => {
  return (
    <>
      {activeInputTypes.map((item) => {
        const { Component } = inputFields[item.type];
        return <Component key={item.type} control={control} />;
      })}
    </>
  );
};
