import React, { FC } from 'react';

import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';

import { useTranslation } from '../../../../i18n';

import { ManageCurrencyForm } from '../../../../components/settings/ManageCurrencyForm';

interface Props extends ModalComponentProps {
}

export const CurrencyManage: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Manage Currency')}</span>}
      onClose={onCloseModal}
    >
      <ManageCurrencyForm />
    </HocModal>
  );
};
