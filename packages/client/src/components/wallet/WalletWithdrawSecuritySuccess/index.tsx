import React, { FC } from 'react';
import { ButtonColor, CoinType } from '@betnomi/libs/types';
import { Button } from '@betnomi/libs/components';
import { truncate } from '../../../utils/helpers';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { WalletWithdrawSecuritySummary } from '../WalletWithdrawSecuritySummary';
import { WalletWithdrawSuccessIcon } from '../WalletWithdrawSuccessIcon';
import { HocModal } from '../../modal/HocModal';

interface Props {
  coin: CoinType;
  amount: number;
  network?: CoinType;
  fee: number;
  address: string;
  precision?: number;
  onClose: () => void;
}

const WalletWithdrawSecuritySuccess: FC<Props> = ({
  coin,
  amount,
  precision = 8,
  fee,
  network,
  address,
  onClose,
}) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      onClose={onClose}
      title={<span className={styles.header}>{t('Withdrawal Successful')}</span>}
    >
      <form onSubmit={onClose} className={styles.form}>
        <div className={styles.summary}>
          <WalletWithdrawSecuritySummary
            address={address}
            coin={coin}
            amount={amount}
            precision={precision}
            fee={fee}
            network={network}
          />
        </div>

        <hr />

        <div className={styles.content}>
          <WalletWithdrawSuccessIcon />

          <div className={styles.title}>
            {t('Withdrawal Request Submitted')}
          </div>

          <div className={styles.subtitle}>{t('The receiver will get')}</div>

          <div className={styles.amount}>
            {t('{{count}} {{coin}} (Fee {{fee}} {{coin}})', {
              count: Number(truncate(String(amount), precision)),
              coin,
              fee: Number(truncate(String(fee), precision)),
            })}
          </div>
        </div>

        <Button
          color={ButtonColor.Primary}
          fullWidth
          size={52}
          className={styles.submit}
          type="button"
          onClick={onClose}
        >
          {t('Close')}
        </Button>
      </form>
    </HocModal>
  );
};

export { WalletWithdrawSecuritySuccess };
