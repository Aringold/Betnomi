import React, { FC } from 'react';
import { useTranslation } from '../../../i18n';

import styles from './styles.module.scss';
import reusableStyles from '../../../../../libs/assets/styles/reusable.module.scss';

const Header: FC = () => {
  const { t } = useTranslation('poker');

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
