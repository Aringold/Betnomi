import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface IProps {}

const Header: FC<IProps> = () => {
  const { t } = useTranslation('policy');

  return (
    <div className={styles.wrapper}>
      <h1>{t('header')}</h1>
    </div>
  );
};

export { Header };
