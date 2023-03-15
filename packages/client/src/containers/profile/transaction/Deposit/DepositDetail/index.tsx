import React, { SyntheticEvent, useMemo } from 'react';

import { format } from 'date-fns';
import Coin from '@betnomi/libs/components/Coin';
import { ReactComponent as CopyIcon } from '@betnomi/libs/assets/img/icons/copy.svg';
import { ReactComponent as LinkIcon } from '@betnomi/libs/assets/img/icons/link.svg';

import { TransactionStatus } from '@betnomi/client/src/components/transaction/TransactionStatus';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { Links, USDTSubTypes } from '@betnomi/client/src/hooks/formik/useDepositAllForm';
import { formatNumber } from '@betnomi/client/src/utils/helpers';
import { CoinType } from '@betnomi/libs/types';
import { selectProfileDepositAll } from '@betnomi/client/src/store/profile/selectors';
import styles from './styles.module.scss';
import { CopyPopover } from '../../../../../components/common/CopyPopover';

type Props = {};

export const DepositDetail: React.FC<Props> = () => {
  const { depositDetail } = useShallowSelector(selectProfileDepositAll);
  const modifiedDate = useMemo(() => format(new Date(Number(depositDetail.createdAt) * 1000), 'PP HH:mm'), [depositDetail.createdAt]);

  const linksHandler = (e: SyntheticEvent, data: string, type: 'txId' | 'address') => {
    if (data) {
      const currency = depositDetail.currency as CoinType;
      const name = Links[currency].name !== '' ? `${Links[currency].name}/` : '';
      let URL = '';
      let CurrencyType;

      if (currency === CoinType.tether && depositDetail.withdrawDepositDetail?.chain) {
        URL = USDTSubTypes[depositDetail.withdrawDepositDetail.chain].url;
        CurrencyType = USDTSubTypes[depositDetail.withdrawDepositDetail.chain][type];
      } else {
        URL = Links[currency].url;
        CurrencyType = Links[currency][type];
      }
      window.open(`${URL}/${name}${CurrencyType}/${data}`);
    }
  };

  return (
    <>
      {depositDetail && (
        <div className={styles.detailsWrap}>
          <div>
            <p className={styles.label}>Status</p>
            <TransactionStatus
              label={depositDetail.resultType}
              type={depositDetail.resultType}
            />
          </div>
          <div>
            <p className={styles.label}>Date</p>
            <p>{modifiedDate}</p>
          </div>
          <div>
            <p className={styles.label}>Coin</p>
            <div className={styles.coin}>
              <Coin coin={depositDetail.currency} size={16} />

              <span>{depositDetail.currency}</span>
            </div>
          </div>
          <div>
            <p className={styles.label}>Deposit amount</p>
            <p>{ formatNumber(String(depositDetail.amount), 6) }</p>
          </div>
          <div>
            <p className={styles.label}>Address</p>
            <div className={styles.itemContent}>
              <p className={styles.wrapText}>{depositDetail.withdrawDepositDetail.addr}</p>
              <LinkIcon onClick={(e) => linksHandler(e, depositDetail.withdrawDepositDetail.addr, 'address')} />
              <CopyPopover icon={<CopyIcon width={24} height={24} />} text={depositDetail.withdrawDepositDetail.addr} />
            </div>
          </div>
          <div>
            <p className={styles.label}>TxID</p>
            <div className={styles.itemContent}>
              <p className={styles.wrapText}>{depositDetail.withdrawDepositDetail.tx}</p>
              <LinkIcon onClick={(e) => linksHandler(e, depositDetail.withdrawDepositDetail.tx, 'txId')} />
              <CopyPopover icon={<CopyIcon width={24} height={24} />} text={depositDetail.withdrawDepositDetail.tx} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
