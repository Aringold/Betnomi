import React, { FC, useMemo } from 'react';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import { Timer } from '@betnomi/libs/components/Timer';
import { coinOrder, CoinType } from '@betnomi/libs/types';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { useUserUI } from '../../../hooks/useUserUI';
import { useShallowSelector } from '../../../hooks';
import { selectAffiliateAccount } from '../../../store/affiliate/selectors';
import { selectCryptoCurrencies } from '../../../store/settings/selectors';
import { formatNumber } from '../../../utils/helpers';

const CashBackTable: FC = () => {
  const { t } = useTranslation('profile');

  const {
    isChatActive,
  } = useUserUI();
  const {
    list,
  } = useShallowSelector(selectAffiliateAccount);
  const cryptoCurrencies = useShallowSelector(selectCryptoCurrencies);

  const coins = useMemo(() => coinOrder.filter((coin) => coin !== CoinType.sbni && cryptoCurrencies[coin]), [cryptoCurrencies]);

  const getListItem = coins.map((coin) => {
    const getList = list?.find((item) => item.currency === coin);
    return ({
      currency: coin,
      balance: getList?.balance ?? '0.0000000',
      totalEarned: getList?.totalEarned ?? '0.0000000',
      totalWithdrawn: getList?.totalWithdrawn ?? '0.0000000',
    });
  });

  return (
    <>
      <div className={styles.wrap}>
        <div className={classNames(styles.title_wrap, { [styles.active]: isChatActive })}>
          <div className={styles.title}>
            <h4>{t('Cashback Cashout')}</h4>
            <p>{t('Bonus Cashback text')}</p>
          </div>
          <div className={styles.right_panel}>
            <div className={styles.my_cashback}>
              <p className={styles.description}>{t('My Cashback')}</p>
              <p className={styles.cashback_value}>2%</p>
            </div>
            <div className={styles.timer_wrap}>
              <p className={styles.description}>{`${t('Payout in')}:`}</p>
              <Timer />
            </div>
          </div>
        </div>
        <p className={styles.link}>Show more</p>
      </div>
      <div className={styles.table_content}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.th}>{t('Withdrawn')}</th>
              <th className={styles.th}>{t('Pending')}</th>
              <th className={styles.th}>{t('Available')}</th>
              <th className={styles.th}>{}</th>
            </tr>
          </thead>
          <tbody>
            {getListItem.map((item) => (
              <tr key={item.totalEarned + item.currency} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    {formatNumber(String(item.totalWithdrawn), 8)}
                    <CoinImg imgData={item.currency} />
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    {formatNumber(String(item.totalEarned), 8)}
                    <CoinImg imgData={item.currency} />
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    {formatNumber(String(item.balance), 8)}
                    <CoinImg imgData={item.currency} />
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    <button className={classNames(styles.withdrawn_button, { [styles.active]: Number(item.balance) > 0 })}>
                      <FontIcon name={FontIconName.Bitcoin} size={16} />
                      Withdrawn
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { CashBackTable };
