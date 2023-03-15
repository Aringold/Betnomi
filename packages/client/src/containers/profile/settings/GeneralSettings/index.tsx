import React from 'react';
import { GeneralForm } from 'components/settings/GeneralForm';
import { useUser } from '../../../../hooks/useUser';

export const GeneralSettings = () => {
  const { image } = useUser();

  return (
    <GeneralForm image={image} />
  ); 
};
