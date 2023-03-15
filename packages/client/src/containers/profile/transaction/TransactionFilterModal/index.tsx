import React, { FC } from 'react';

import { useTranslation } from '@betnomi/client/src/i18n';

import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';
import { TransactionAll } from '../TransactionAll';

interface Props extends ModalComponentProps {
}

export const TransactionFilterModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Filter')}</span>}
      onClose={onCloseModal}
    >
      <TransactionAll ClassName="sportBets" />
    </HocModal>
  );
};
