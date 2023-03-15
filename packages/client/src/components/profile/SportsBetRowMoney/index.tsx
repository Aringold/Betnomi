import React from 'react';
import Coin from '@betnomi/libs/components/Coin';
import { CoinType } from '@betnomi/libs/types';
import { CurrencySymbol } from '@betnomi/libs/utils/currency';
import { formatNumber } from '@betnomi/client/src/utils/helpers';
import styles from './styles.module.scss';

type MoneyProp = {
  coin: CoinType,
  bcCurrency?: string,
  value: number,
};

export const SportsBetRowMoney: React.FC<MoneyProp> = ({
  coin,
  bcCurrency,
  value,
}) => (
  <div className={styles.money}>
    {
      bcCurrency && <span className={styles.bcCurrency}>{`${CurrencySymbol[bcCurrency] ?? '$'}`}</span>
    }
    <span>{formatNumber(String(value), 6)}</span>
    <Coin coin={coin} size={16} className={styles.coin} />
  </div>
);
