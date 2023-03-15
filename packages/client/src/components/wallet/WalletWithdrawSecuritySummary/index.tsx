import React, { FC } from 'react';
import { Coin } from '@betnomi/libs/components';
import { coinNames, CoinType } from '@betnomi/libs/types';
import { truncate } from '../../../utils/helpers';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface Props {
  coin: CoinType;
  amount: number;
  fee: number;
  address: string;
  network?: CoinType;
  precision?: number;
}

const WalletWithdrawSecuritySummary: FC<Props> = ({
  coin,
  amount,
  address,
  network,
  precision,
  fee,
}) => {
  const { t } = useTranslation('profile');

  return (
    <div className={styles.summary}>
      <div className={styles.label}>{t('Amount')}</div>
      <div className={styles.value}>
        <Coin coin={coin} size={12} className={styles.coin} />
        <span>
          {t('Receive {{amount}} {{coin}} (Network fee {{fee}} {{coin}})', {
            amount: truncate(String(amount), precision),
            coin,
            fee: truncate(String(fee), precision),
          })}
        </span>
      </div>

      <div className={styles.label}>{t('Address')}</div>
      <div className={styles.value}>
        {address || '0x535B26df504dcBc12C6dbA49fB1F05dA05a44381'}
      </div>

      <div className={styles.label}>{t('Network')}</div>
      <div className={styles.value}>
        {network || coinNames[coin]}
      </div>
    </div>
  );
};

export { WalletWithdrawSecuritySummary };
