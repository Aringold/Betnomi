import React, { SyntheticEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import cx from 'classnames';
import { format } from 'date-fns';

import { DepositAllItem, DepositAllList } from '@betnomi/client/src/store/profile/types';
import { TransactionStatus } from '@betnomi/client/src/components/transaction/TransactionStatus';
import { useTranslation } from '@betnomi/client/src/i18n';
import { ModalType } from '@betnomi/client/src/store/modal/types';
import { useModal } from '@betnomi/client/src/hooks/useModal';
import { profileSetDepositDetail } from '@betnomi/client/src/store/profile/actionCreators';
import { ReactComponent as LinkIcon } from '@betnomi/libs/assets/img/icons/link.svg';
import { Links, USDTSubTypes } from '@betnomi/client/src/hooks/formik/useDepositAllForm';
import { formatNumber } from '@betnomi/client/src/utils/helpers';
import { Coin } from '@betnomi/libs/components';
import { CoinType } from '@betnomi/libs/types';
import { CopyPopover } from '@betnomi/client/src/components/common/CopyPopover';
import { ReactComponent as CopyIcon } from '@betnomi/libs/assets/img/icons/copy.svg';

import styles from './styles.module.scss';

type RowProps = {
  item: DepositAllItem;
  onClick?: () => void;
  tabType: string;
};

const sliceString = (str: string) => `${str.substring(0, 5)}.....${str.substring(str.length - 5)}`;

const Row:React.FC<RowProps> = ({
  item: {
    createdAt,
    currency,
    amount,
    resultType,
    withdrawDepositDetail,
  },
  onClick,
  tabType,
}) => {
  const modifiedDate = useMemo(() => format(new Date(Number(createdAt) * 1000), 'PP HH:mm'), [createdAt]);

  const linksHandler = (e: SyntheticEvent, data: string, type: 'txId' | 'address') => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (data) {
      const name = Links[currency].name !== '' ? `${Links[currency].name}/` : '';
      let URL = '';
      let CurrencyType;

      if (currency === CoinType.tether && withdrawDepositDetail?.chain) {
        URL = USDTSubTypes[withdrawDepositDetail.chain].url;
        CurrencyType = USDTSubTypes[withdrawDepositDetail.chain][type];
      } else {
        URL = Links[currency].url;
        CurrencyType = Links[currency][type];
      }
      window.open(`${URL}/${name}${CurrencyType}/${data}`);
    }
  };

  return (
    <tr className={styles.row_tr} onClick={onClick}>
      <td className={cx(styles.td, styles.td_m)}>
        {modifiedDate}
      </td>
      <td className={styles.td}>
        {tabType}
      </td>
      <td className={cx(styles.td, styles.coin_name)}>
        <p>{currency}</p>
        <Coin coin={currency} size={16} />
      </td>
      <td className={styles.td}>
        {formatNumber(String(amount), 6)}
      </td>
      <td className={styles.td}>
        <div className={styles.td_link}>
          <span>{withdrawDepositDetail && sliceString(withdrawDepositDetail.addr)}</span>
          <LinkIcon
            width={16}
            height={16}
            onClick={(e) => linksHandler(e, withdrawDepositDetail ? withdrawDepositDetail.addr : '', 'address')}
          />
          <CopyPopover icon={<CopyIcon width={16} height={16} />} text={withdrawDepositDetail ? withdrawDepositDetail.addr : ''} />
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.td_link}>
          <span>{withdrawDepositDetail && sliceString(withdrawDepositDetail.tx)}</span>
          <LinkIcon
            width={16}
            height={16}
            onClick={(e) => linksHandler(e, withdrawDepositDetail ? withdrawDepositDetail.tx : '', 'txId')}
          />
          <CopyPopover icon={<CopyIcon width={16} height={16} />} text={withdrawDepositDetail ? withdrawDepositDetail.tx : ''} />
        </div>
      </td>
      <td className={styles.td}>
        <TransactionStatus
          label={resultType}
          type={resultType}
        />
      </td>
    </tr>
  );
};

type Props = {
  tableList: DepositAllList;
  tabType: string;
};

export const DepositTable:React.FC<Props> = ({ tableList, tabType }) => {
  const { t } = useTranslation('profile');
  const { showModal } = useModal();
  const dispatch = useDispatch();

  const handleRowClick = (el: DepositAllItem) => {
    dispatch(profileSetDepositDetail(el));
    showModal(ModalType.DepositDetailsModal)();
  };

  return (
    <table id="destination" className={styles.table}>
      <thead className={styles.head}>
        <tr className={styles.tr}>
          <th className={cx(styles.th, styles.td_m)}>
            {t('Time')}
          </th>
          <th className={styles.th}>
            {t('Type')}
          </th>
          <th className={styles.th}>
            {t('Assets')}
          </th>
          <th className={styles.th}>
            {t('Amount')}
          </th>
          <th className={styles.th}>
            {t('Destination')}
          </th>
          <th className={styles.th}>
            {t('TxID')}
          </th>
          <th className={styles.th}>
            {t('Status')}
          </th>
        </tr>
      </thead>
      <tbody>
        {tableList?.map((el) => (
          <Row
            onClick={() => handleRowClick(el)}
            item={el}
            tabType={tabType}
            key={el.id}
          />
        ))}
      </tbody>
    </table>
  );
};
