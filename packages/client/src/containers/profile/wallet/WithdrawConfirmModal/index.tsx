import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@betnomi/libs/components';
import { ButtonColor } from '@betnomi/libs/types';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { ModalComponentProps } from '../../../../components/modal/Modal';

import { WalletWithdrawSecuritySummary } from '../../../../components/wallet/WalletWithdrawSecuritySummary';
import { HocModal } from '../../../../components/modal/HocModal';
import { useWithdrawConfirmFormik } from '../../../../hooks/formik/useWithdrawConfirmFormik';

import { useModal } from '../../../../hooks/useModal';
import { profileWithdraw } from '../../../../store/profile/actionCreators';
import styles from './styles.module.scss';

interface Props extends ModalComponentProps {}

const WithdrawConfirmModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');
  const {
    coin,
    amount,
    network,
    address,
    fee,
    isLoading,
    destTag,
  } = useWithdrawConfirmFormik();
  const dispatch = useDispatch();
  const { onCloseModal: cancel } = useModal();
  const { showErrorToast, hideToast } = useToasts();

  const onContinue = () => {
    hideToast();

    const Withdraw = {
      fee,
      amount,
      coin,
      network,
      address,
      destTag,
    };

    const callback = (e?: string) => {
      if (e) {
        showErrorToast(t(e));
        cancel();
      }
    };

    dispatch(profileWithdraw(Withdraw, callback));
  };

  return (
    <HocModal
      onClose={onCloseModal}
      title={
        <span className={styles.header}>{t('Verify your Information')}</span>
      }
    >
      <div className={styles.form}>
        <WalletWithdrawSecuritySummary
          address={address}
          coin={coin}
          network={network}
          amount={amount}
          precision={8}
          fee={fee}
        />

        <div className={styles.content}>
          <div className={styles.list}>
            <p>Ensure that the address is correct and on the same network.</p>
            <p>Transactions cannot be cancelled.</p>
          </div>
        </div>

        <Button
          color={ButtonColor.Primary}
          fullWidth
          size={52}
          className={styles.submit}
          isLoading={isLoading}
          onClick={onContinue}
        >
          {t('Continue')}
        </Button>
      </div>
    </HocModal>
  );
};

export { WithdrawConfirmModal };
