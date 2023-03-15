import React, { FC, useEffect } from 'react';

import { Header } from './Header';

import styles from './styles/styles.module.scss';
import { useUserUI } from '../../hooks/useUserUI';

const RNG: FC = () => {
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.description}>
        <p>
          Betnomi one of the leading online casino and sportsbook operators worldwide, offering its users a fascinating variety of online and live casino games, slots, poker, and more.  We always strive to reach the unfailingly reliable service that meets all the demanding present-day criteria of the gaming industry. We are proud to be an NMi RNG certificate holder since NMi is one of the world &apos; s market-leading and robust RNG testing methodologies in the land-based and online gambling sector.
        </p>
      </div>
    </div>
  );
};

export default RNG;
