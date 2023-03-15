import React, { FC, useEffect } from 'react';

import { useUserUI } from 'hooks/useUserUI';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';

import { Header } from './Header';
import { Accordion } from './Accordion';

interface IProps {}

const Terms: FC<IProps> = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const scheme = [6, 28, 3, 3, 7, 13, 6, 1, 3, 7, 4, 1, 3, 5, 7, 30, 11];
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <Accordion isMobile={isMobile} type="terms" scheme={scheme} />
    </div>
  );
};

export default Terms;
