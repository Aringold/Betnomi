import React, { FC, useEffect } from 'react';

import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';
import { useUserUI } from '../../hooks/useUserUI';

import { Header } from './Header';
import { Accordion } from './Accordion';

import styles from './styles.module.scss';

const scheme = [6, 18];

const Gambling: FC = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { isChatActive, setIsChatActive, setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    if (isChatActive) {
      setIsChatActive(false);
    }
  }, [isChatActive]);

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <Accordion isMobile={isMobile} type="gambling" scheme={scheme} />
    </div>
  );
};

export default Gambling;
