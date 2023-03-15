import React, { FC } from 'react';
import { useTranslation } from '../../../i18n';

import styles from './styles.module.scss';

const Header: FC = () => {
  const { t } = useTranslation('rng');

  return (
    <div className={styles.wrapper}>
      <h1>{t('header')}</h1>
    </div>
  );
};

export { Header };
