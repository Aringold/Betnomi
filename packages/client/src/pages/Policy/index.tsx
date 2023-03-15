import React, { FC, useEffect } from 'react';

import { useUserUI } from 'hooks/useUserUI';
import styles from './styles/styles.module.scss';
import { Header } from './Header';
import { Accordion } from '../Terms/Accordion';
import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';

const scheme = [4, 2, 1, 6, 5, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1];

const Policy: FC = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);
  
  return (
    <div className={styles.page}>
      <Header />
      <Accordion isMobile={isMobile} type="policy" scheme={scheme} />
    </div>
  );
};

export default Policy;
