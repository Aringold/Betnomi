import React, {
  FC, useEffect,
} from 'react';

import { Header } from './Header';
import { Content } from './Content';

import { useUserUI } from '../../hooks/useUserUI';

import styles from './styles/styles.module.scss';

const Contact: FC = () => {
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <Content />
    </div>
  );
};

export default Contact;
