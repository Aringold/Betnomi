import React, { useMemo } from 'react';
import cx from 'classnames';
import { format } from 'date-fns';
import { TransactionAllItem, TransactionAllList } from '../../../store/profile/types';
import { SportsBetRowMoney } from '../../profile/SportsBetRowMoney';
import { TransactionStatus } from '../TransactionStatus';
import { useTranslation } from '../../../i18n';
import { TransactionAllType } from '../../../constants/transaction';
import styles from './styles.module.scss';

type RowProps = {
  item: TransactionAllItem
};

const Row:React.FC<RowProps> = ({
  item: {
    finalAmountFiat,
    finalAmount,
    createdAt,
    currency,
    displayAmount,
    id,
    product,
    resultType,
    transactionType,
    displayCurrency,
    amount,
    transferDetails,
  },
}) => {
  const modifiedDate = useMemo(() => format(new Date(Number(createdAt) * 1000), 'PP HH:mm'), [createdAt]);
  return (
    <tr>
      <td className={cx(styles.td, styles.td_m)}>
        {id}
      </td>
      <td className={styles.td}>
        {modifiedDate}
      </td>
      <td className={styles.td}>
        {transactionType === TransactionAllType.TransferTo ? transferDetails?.message : transactionType}
      </td>
      <td className={styles.td}>
        {transactionType === TransactionAllType.TransferTo ? transferDetails?.toUsername : product}
      </td>
      <td className={styles.td}>
        <TransactionStatus
          label={resultType} 
          type={resultType}
        />
      </td>
      <td className={styles.td}>
        <SportsBetRowMoney
          coin={currency}
          bcCurrency={displayCurrency}
          value={transactionType === TransactionAllType.TransferTo ? amount : displayAmount}
        />
      </td>
      <td className={styles.td}>
        <SportsBetRowMoney
          coin={currency}
          bcCurrency={displayCurrency}
          value={transactionType === TransactionAllType.TransferTo ? finalAmount : finalAmountFiat}
        />
      </td>
    </tr>
  ); 
};

type Props = {
  list: TransactionAllList
};

export const TransactionAllTable:React.FC<Props> = ({ list }) => {
  const { t } = useTranslation('profile');
  
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr className={styles.tr}>
          <th className={cx(styles.th, styles.td_m)}>
            {t('Transaction ID')}
          </th>
          <th className={styles.th}>
            {t('Date')}
          </th>
          <th className={styles.th}>
            {t('Type')}
          </th>
          <th className={styles.th}>
            {t('Product')}
          </th>
          <th className={styles.th}>
            {t('Status')}
          </th>
          <th className={cx(styles.th, styles.alignRight)}>
            {t('Amount')}
          </th>
          <th className={cx(styles.th, styles.alignRight)}>
            {t('Final Amount')}
          </th>
        </tr>
      </thead>
      <tbody>
        {list?.map((el) => <Row item={el} key={el.id} />)}
      </tbody>
    </table>
  );
};
