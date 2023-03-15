/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { useShallowSelector } from 'hooks';
import { selectAuthUI } from 'store/auth/selectors';
import { ModalType } from '../../../../store/modal/types';
import { SportsBetTable } from '../../../../components/profile/SportsBetTable';
import { useModal } from '../../../../hooks/useModal';
import { TransactionAllFormWrap } from '../../../../components/transaction/TransactionAllFormWrap';

import styles from './styles.module.scss';

interface Props {
  isMobile: boolean
}

export const SportBets:React.FC<Props> = ({ isMobile }) => {
  const { showModal } = useModal();
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const midScreen = window.matchMedia('(min-width:1023px) and (max-width: 1201px)').matches;

  return (
    <>

      {isMobile || (isChatActive && midScreen) || (isMenuActive && midScreen) ? (
        <div
          onClick={() => {
            showModal(ModalType.SportBetsFilter)();
          }}
          className={styles.filterBtn}
        >
          <p>Filter</p>
          <span className={styles.filterAmount}>0</span>
        </div>
      ) : (
        <TransactionAllFormWrap />
      )}

      <div className={styles.tableResponsive}>
        <SportsBetTable />
      </div>
    </>
  );
};
