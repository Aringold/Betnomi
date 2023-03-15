import React, { FC } from 'react';
import { useTranslation } from '../../i18n';

import styles from './styles.module.scss';
import reusableStyles from '../../../../libs/assets/styles/reusable.module.scss';

interface IProps {
  type: string,
  link?: string
}

const Header: FC<IProps> = ({ type, link }) => {
  const { t } = useTranslation(type);

  return (
    <div className={styles.wrapper}>
      <h1>{t('header')}</h1>
      <p>{t('description')}</p>
      { link && (
      <a href={link} target="_blank" rel="noreferrer" className={`${reusableStyles.link} ${reusableStyles.primary}`}>
        Betnomi.me
      </a>
      ) }
    </div>
  );
};

export { Header };
