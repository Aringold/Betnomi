import React, { FC } from 'react';
import cx from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { CoinType } from '@betnomi/libs/types';
import Coin from '@betnomi/libs/components/Coin';
import { formatNumber } from '../../../../utils/helpers';

import styles from './styles.module.scss';

interface Props {
  active?: boolean;
  currency: CoinType;
  data: {
    userCreatedAt: string,
    lastDeposit: string,
    wagered: number,
    commission: number,
    userName: string;
    firstDeposit: string;
    depositCount: number;
  }
}

interface RowProps {
  name: string;
  value: string | number;
  clock?: boolean;
  className?: string;
  currency?: CoinType | undefined;
}

const Row: FC<RowProps> = ({
  name, value, currency, className,
}) => {
  const { t } = useTranslation('profile');
  return (
    <div className={cx(styles.row_wrap, className)}>
      <span>{t(name)}</span>
      <span className={styles.white_color}> 
        {' '}
        {value}
        {' '}
      </span>
      {currency && <Coin coin={currency} size={16} />}
    </div>
  );
};

const ReferralTableDescriptionRow: FC<Props> = ({ active, currency, data }) => {
  const modifiedDate = (date: string) => format(new Date(Number(date) * 1000), 'PP');

  return (
    <div className={cx(styles.wrap, { [styles.active]: active })}>
      <div className={styles.left_panel}>
        <div className={styles.value}>
          <Row name="Username" value={data.userName} className={styles.row} />
          <Row name="Created" value={modifiedDate(data.userCreatedAt)} className={styles.row} />
          <Row name="Deposits" value={data.depositCount} className={styles.row} />
          <Row name="Last Deposits" value={modifiedDate(data.lastDeposit)} className={styles.row} />
        </div>

        <div className={styles.info_wrap}>
          <div>
            <Row className={styles.row} name="Wagered" value={formatNumber(String(data.wagered), 10)} currency={currency} />
          </div>

          <div>
            <Row name="Commission" value={formatNumber(String(data.commission), 10)} currency={currency} className={styles.row} />
          </div>

        </div>
      </div>
    </div>
  );
};

export { ReferralTableDescriptionRow };
