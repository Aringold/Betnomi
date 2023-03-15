import { Loading } from '@betnomi/libs/components/Loading';
import React from 'react';
import styles from './styles.module.scss';

export const FullPageLoading:React.FC = () => (
  <div className={styles.container}>
    <Loading />
  </div>
);
