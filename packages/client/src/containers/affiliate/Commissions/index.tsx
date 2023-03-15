/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { CoinImg } from '@betnomi/libs/components/CoinImg';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { coinOrder, CoinType } from '@betnomi/libs/types';
import { affiliateGetAccount, WithdrawTransfer } from '../../../store/affiliate/actionCreators';
import { formatNumber } from '../../../utils/helpers';
import { useShallowSelector } from '../../../hooks';
import { selectAffiliateAccount } from '../../../store/affiliate/selectors';
import { selectCryptoCurrencies } from '../../../store/settings/selectors';
import { selectAuthRanksMy } from '../../../store/auth/selectors';
import Gradient from '../../../components/common/Gradient';
import { selectIsMobile } from '../../../store/global/selectors';
import styles from './styles.module.scss';

interface Props {
}

const Commissions: FC<Props> = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { commissionRate } = useShallowSelector(selectAuthRanksMy);
  const [isExpanded, setExpanded] = useState(false);
  const isMobile = useShallowSelector(selectIsMobile);
  const {
    list,
  } = useShallowSelector(selectAffiliateAccount);
  const cryptoCurrencies = useShallowSelector(selectCryptoCurrencies);

  useEffect(() => {
    dispatch(affiliateGetAccount());
  }, []);

  const coins = useMemo(() => coinOrder.filter((coin) => cryptoCurrencies[coin]), [cryptoCurrencies]);

  const getListItem = coins.map((coin) => {
    const getList = list?.find((item) => item.currency === coin);
    return ({
      currency: coin,
      balance: getList?.balance ?? '0.0000000',
      totalEarned: getList?.totalEarned ?? '0.0000000',
      totalWithdrawn: getList?.totalWithdrawn ?? '0.0000000',
    });
  });

  const handleShowMore = () => {
    setExpanded(!isExpanded);
  };

  const handleWithdraw = (currency: CoinType) => {
    dispatch(WithdrawTransfer({ currency }));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <div className={styles.title}>
          <h4>{t('Commission Rewards')}</h4>
          {
            isMobile ? (
              <div className={styles.desc}>
                <p>
                  {t('Commissions are revenues you earn from the transaction by the users you refer to our website.')}
                </p>
                <p>
                  {t('Your rewards are paid in realtime and are withdrawable anytime.')}
                </p>
                <Gradient state={isExpanded} />
                <div className={classNames(styles.hidden, { [styles.activeText]: isExpanded })}>
                  <p>
                    {t('You earn a percentage of the house edge, the actual amount you make may be slightly different from the amount advertised depending on how much bonuses, rake backs, and cashback the referred users claim.')}
                  </p>
                  <p>
                    {t('For a more detailed breakdown, contact one of our affiliate managers.')}
                  </p>
                </div>
              </div>
            )
              : (
                <div className={styles.desc}>
                  <p>
                    {t('Commissions are revenues you earn from the transaction by the users you refer to our website.')}
                  </p>
                  <p>
                    {t('Your rewards are paid in realtime and are withdrawable anytime.')}
                  </p>
                  <p>
                    {t('You earn a percentage of the house edge, the actual amount you make may be slightly different from the amount advertised depending on how much bonuses, rake backs, and cashback the referred users claim.')}
                  </p>
                  <Gradient state={isExpanded} />
                  <div className={classNames(styles.hidden, { [styles.activeText]: isExpanded })}>
                    <p>
                      {t('For a more detailed breakdown, contact one of our affiliate managers.')}
                    </p>
                  </div>
                </div>
              )
          }

        </div>
        <div className={styles.right_panel}>
          <div className={styles.my_cashback}>
            <p className={styles.description}>{t('Commission Rate')}</p>
            <p className={styles.cashback_value}>
              {`${Number(commissionRate) * 100}%`}
            </p>
          </div>
        </div>
      </div>
      <p className={styles.link}>
        <button onClick={handleShowMore}>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </p>
      <div className={styles.table_content}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.th}>{t('Withdrawn')}</th>
              <th className={styles.th}>{t('Total Earned')}</th>
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
                    <button disabled={Number(item.balance) === 0} className={classNames(styles.withdrawn_button, { [styles.active]: Number(item.balance) > 0 })} onClick={() => handleWithdraw(item.currency)}>
                      <FontIcon name={FontIconName.Bitcoin} size={16} />
                      {t('Withdraw')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Commissions;
