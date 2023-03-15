import React, { FC } from 'react';

import { ModalComponentProps } from '@betnomi/client/src/components/modal/Modal';
import { HocModal } from '@betnomi/client/src/components/modal/HocModal';

import { useTranslation } from '@betnomi/client/src/i18n';
import { DepositAll } from '../DepositAll';

interface Props extends ModalComponentProps {
}

export const DepositFilterModal: FC<Props> = ({ onCloseModal, params }) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Filter')}</span>}
      onClose={onCloseModal}
    >
      <DepositAll ClassName="sportBets" type={params.type} />
    </HocModal>
  );
};
