/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ReferralsFormContainer } from './ReferralsFormContainer';
import { useShallowSelector } from '../../../hooks';
import { ReferralsTable } from './ReferralsTable';
import { selectAffiliateReferrals } from '../../../store/affiliate/selectors';
import { Pagination } from '../../../components/common/Pagination';
import { affiliateGetReferrals } from '../../../store/affiliate/actionCreators';
import { referralsAllInitialValues } from '../../../hooks/formik/useReferralsForm';
import { selectAuthUI } from '../../../store/auth/selectors';
import { useModal } from '../../../hooks/useModal';
import { ModalType } from '../../../store/modal/types';
import styles from './styles.module.scss';

interface Props {
  isMobile: boolean;
}

const Referrals: FC<Props> = ({ isMobile }) => {
  const midScreen = window.matchMedia('(min-width:1023px) and (max-width: 1201px)').matches;
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const {
    list,
    total,
    offset,
    limit,
  } = useShallowSelector(selectAffiliateReferrals);

  const handlePaginate = (data: any) => {
    dispatch(affiliateGetReferrals({
      ...referralsAllInitialValues,
      offset: data.offset,
      limit: data.limit,
    }));
  };

  return (
    <>
      {isMobile || (isChatActive && midScreen) || (isMenuActive && midScreen) ? (
        <div
          onClick={() => {
            showModal(ModalType.ReferralFilter)();
          }}
          className={styles.filterBtn}
        >
          <p>Filter</p>
          <span className={styles.filterAmount}>3</span>
        </div>
      ) : (
        <ReferralsFormContainer />
      )}
      <ReferralsTable data={Object.values(list || [])} />
      {
        Number(total) > limit && <Pagination total={Number(total)} limit={limit} onChange={handlePaginate} currentPage={offset} />
      }
    </>
  );
};

export default Referrals;
