import React, { FC, useEffect } from 'react';

import { useUserUI } from 'hooks/useUserUI';
import styles from '../Policy/styles/styles.module.scss';
import { Header } from './Header';
import { Accordion } from '../Terms/Accordion';
import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';

const scheme = [1, 3, 6, 5, 6, 1, 2, 16, 15, 3, 18, 5, 1, 1, 5, 1, 1, 1];

const Aml: FC = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <Accordion isMobile={isMobile} type="aml" scheme={scheme} />
    </div>
  );
};

export default Aml;
