/* eslint-disable max-len */
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { format } from 'date-fns';
import { CoinType } from '@betnomi/libs/types';

// import BitcoinSvg from '@betnomi/libs/assets/img/coins/bitcoin.svg';
import { Coin } from '@betnomi/libs/components';
import { ReferralTableDescriptionRow } from '../ReferralTableDescriptionRow';
import { formatNumber } from '../../../../utils/helpers';
import styles from './styles.module.scss';

interface DataProps {
  userName: string,
  userCreatedAt: string,
  firstDeposit: string,
  lastDeposit: string,
  depositCount: number,
  wagered: number,
  commission: number,
}

interface Props {
  data: DataProps[];
}

const ReferralsTable: FC<Props> = ({ data }) => {
  const [descriptionsIndex, setDescriptionsIndex] = useState<any>([]);

  const { t } = useTranslation('profile');

  const descriptionHandler = (index: number) => {
    if (descriptionsIndex.includes(index)) {
      return setDescriptionsIndex(descriptionsIndex.filter((currentIndex: number) => currentIndex !== index));
    }
    setDescriptionsIndex([...descriptionsIndex, index]);
  };

  const checkActive = (index: any) => {
    if (descriptionsIndex.includes(index)) {
      return true;
    }
    return false;
  };

  const modifiedDate = (date: string) => format(new Date(Number(date) * 1000), 'PP');

  return (
    <div className={styles.referralsTabel}>
      <div className={styles.table_content}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.th}>{t('Username')}</th>
              <th className={styles.th}>{t('First Deposit')}</th>
              <th className={styles.th}>{t('Total Deposits')}</th>
              <th className={styles.th}>{t('Created')}</th>
              <th className={styles.th}>{t('Wagered')}</th>
              <th className={styles.th}>{t('Commission')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <Fragment key={item.userName}>
                <tr className={styles.tr} onClick={() => descriptionHandler(i)}>
                  <td className={styles.td}>{item.userName}</td>
                  <td className={styles.td}>{modifiedDate(item.firstDeposit)}</td>
                  <td className={styles.td}>
                    <div className={styles.amount}>
                      {item.depositCount}
                    </div>
                  </td>
                  <td className={styles.td}>
                    {modifiedDate(item.userCreatedAt)}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.currency}>
                      <span>
                        {formatNumber(String(item.wagered), 10)}
                      </span>
                      <Coin coin={CoinType.tether} size={16} />
                    </div>
                  </td>
                  <td className={classNames(styles.td, styles.status)}>
                    <div className={styles.currency}>
                      <span>
                        {formatNumber(String(item.commission), 10)}
                      </span>
                      <Coin coin={CoinType.tether} size={16} />
                    </div>
                    <button className={classNames(styles.icon, { [styles.active]: checkActive(i) })}>
                      <FontIcon name={FontIconName.IconArrowBottom} size={16} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <ReferralTableDescriptionRow currency={CoinType.tether} data={item} active={checkActive(i)} />
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ReferralsTable };
