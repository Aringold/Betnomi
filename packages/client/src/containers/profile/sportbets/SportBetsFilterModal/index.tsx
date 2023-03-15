import React, { FC } from 'react';

import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';

import { useTranslation } from '../../../../i18n';
import { TransactionAllFormWrap } from '../../../../components/transaction/TransactionAllFormWrap';

interface Props extends ModalComponentProps {
}

export const SportBetsFilterModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Filter')}</span>}
      onClose={onCloseModal}
    >
      <TransactionAllFormWrap ClassName="sportBets" />
    </HocModal>
  );
};
