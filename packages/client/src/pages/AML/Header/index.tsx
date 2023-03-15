import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

const Header: FC = () => {
  const { t } = useTranslation('aml');

  return (
    <div className={styles.wrapper}>
      <h1>{t('header')}</h1>
    </div>
  );
};

export { Header };
