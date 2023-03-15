import React, { FC, useEffect } from 'react';

import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';
import { useUserUI } from '../../hooks/useUserUI';

import { Header } from '../../components/Header';

import styles from './styles/styles.module.scss';
import { Accordion } from '../../components/Accordion';

const scheme = [132, 16, 17, 34, 20, 6, 14, 52, 88, 7, 6, 40, 8, 5, 16, 25, 8, 53, 27, 18, 3, 14, 12, 39, 16, 17, 3, 6, 15, 39, 6, 27];

const Sport: FC = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header type="sport" />
      <Accordion isMobile={isMobile} type="sport" scheme={scheme} />
    </div>
  );
};

export default Sport;
