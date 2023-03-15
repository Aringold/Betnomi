import React, { FC, useEffect } from 'react';

import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';
import { useUserUI } from '../../hooks/useUserUI';

import { Header } from './Header';
import { Accordion } from './Accordion';

import styles from './styles.module.scss';

const scheme = [2, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1];

const Poker: FC = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <Accordion isMobile={isMobile} type="poker" scheme={scheme} />
    </div>
  );
};

export default Poker;
