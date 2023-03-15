/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';

import { selectAuthUI } from 'store/auth/selectors';
import { ModalType } from '../../../../store/modal/types';
import { useModal } from '../../../../hooks/useModal';

import styles from './styles.module.scss';
import { TransactionAll } from '../TransactionAll';
import { TransactionAllTable } from '../../../../components/transaction/TransactionAllTable';
import { useShallowSelector } from '../../../../hooks';
import { selectProfileTransactionAll } from '../../../../store/profile/selectors';
import { Pagination } from '../../../../components/common/Pagination';
import { profileGetTransactionAll } from '../../../../store/profile/actionCreators';
import { transactionAllInitialValues } from '../../../../hooks/formik/useTransactionAllForm';

interface Props {
  isMobile: boolean
}

export const Transaction:React.FC<Props> = ({ isMobile }) => {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const {
    list,
    total,
    offset,
    limit,
  } = useShallowSelector(selectProfileTransactionAll);
  const midScreen = window.matchMedia('(min-width:1023px) and (max-width: 1201px)').matches;

  const handlePaginate = (data: any) => {
    dispatch(profileGetTransactionAll({
      ...transactionAllInitialValues,
      offset: data.offset,
      limit: data.limit,
    }));
  };

  return (
    <>
      {isMobile || (isChatActive && midScreen) || (isMenuActive && midScreen) ? (
        <div
          onClick={() => {
            showModal(ModalType.TransactionFilter)();
          }}
          className={styles.filterBtn}
        >
          <p>Filter</p>
          <span className={styles.filterAmount}>3</span>
        </div>
      ) : (
        <TransactionAll />
      )}

      <div className={styles.tableWrap}>
        <div className={styles.tableResponsive}>
          <TransactionAllTable list={list} />
        </div>
        {
          Number(total) > 1 && <Pagination total={Number(total)} limit={limit} onChange={handlePaginate} currentPage={offset} />
        }
      </div>
    </>
  );
};
