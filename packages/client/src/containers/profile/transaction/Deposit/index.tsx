/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';

import { ModalType } from '@betnomi/client/src/store/modal/types';
import { useModal } from '@betnomi/client/src/hooks/useModal';
import { selectAuthUI } from 'store/auth/selectors';
import { useShallowSelector } from 'hooks';

import { useTranslation } from '@betnomi/client/src/i18n';
import { Pagination } from '@betnomi/client/src/components/common/Pagination';
import { DepositAll } from './DepositAll';
import { DepositTable } from './DepositTable';
import { selectProfileDepositAll } from '../../../../store/profile/selectors';
import { profileGetDepositAll } from '../../../../store/profile/actionCreators';
import { initialValues } from '../../../../hooks/formik/useDepositAllForm';

import styles from './styles.module.scss';
import { TransactionAllType } from '../../../../constants/transaction';

interface Props {
  isMobile: boolean
  type: TransactionAllType,
}

export const Deposit:React.FC<Props> = ({ isMobile, type }) => {
  const midScreen = window.matchMedia('(min-width:1023px) and (max-width: 1201px)').matches;
  const dispatch = useDispatch();

  const { showModal } = useModal();
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const { t } = useTranslation('profile');
  const {
    list,
    total,
    offset,
    limit,
  } = useShallowSelector(selectProfileDepositAll);

  const handlePaginate = (data: any) => {
    dispatch(profileGetDepositAll({
      ...initialValues(type),
      offset: data.offset,
      limit: data.limit,
    }));
  };

  return (
    <>
      {isMobile || (isChatActive && midScreen) || (isMenuActive && midScreen) ? (
        <div
          onClick={() => {
            showModal(ModalType.DepositFilter, { type })();
          }}
          className={styles.filterBtn}
        >
          <p>{t('Filter')}</p>
          <span className={styles.filterAmount}>4</span>
        </div>
      ) : (
        <DepositAll type={type} />
      )}

      <div className={styles.tableWrap}>
        <div className={styles.tableResponsive}>
          <DepositTable tableList={list} tabType={type} />
        </div>
        {
          Number(total) > 1 && (<Pagination total={Number(total)} limit={limit} onChange={handlePaginate} currentPage={offset} />)
        }
      </div>
    </>
  );
};
