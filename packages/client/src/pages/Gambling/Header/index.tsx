import React, { FC } from 'react';
import reusableStyles from '@betnomi/libs/assets/styles/reusable.module.scss';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

const Header: FC = () => {
  const { t } = useTranslation('gambling');

  return (
    <div className={styles.wrapper}>
      <h1>{t('header')}</h1>
      <p>{t('description')}</p>
      <a href="https://www.begambleaware.org/safer-gambling/" target="_blank" rel="noreferrer" className={`${reusableStyles.link} ${reusableStyles.primary}`}>
        Betnomi.me
      </a>
    </div>
  );
};

export { Header };
