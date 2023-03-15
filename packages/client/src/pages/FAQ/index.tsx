import React, { FC, useEffect } from 'react';
import { useUserUI } from 'hooks/useUserUI';
import styles from './styles.module.scss';

import { Header } from './Header';
import { Cards } from './Cards';
import { Accordion } from './Accordion';

interface IProps {}

const FAQ: FC<IProps> = () => {
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);
  
  return (
    <>
      <Header />
      <div className={styles.page}>
        <Cards />
        <Accordion />
      </div>
    </>
  );
};

export default FAQ;
