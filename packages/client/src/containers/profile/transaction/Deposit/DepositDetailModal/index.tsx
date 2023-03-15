import React, { FC } from 'react';

import { ModalComponentProps } from '@betnomi/client/src/components/modal/Modal';
import { HocModal } from '@betnomi/client/src/components/modal/HocModal';

import { useTranslation } from '@betnomi/client/src/i18n';
import { DepositDetail } from '../DepositDetail';

interface Props extends ModalComponentProps {
}

export const DepositDetailsModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Deposit Details')}</span>}
      onClose={onCloseModal}
    >
      <DepositDetail />
    </HocModal>
  );
};
