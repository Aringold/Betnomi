import React, { FC } from 'react';
import Button from '@betnomi/libs/components/Button';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

interface IProps {}

const Header: FC<IProps> = () => {
  const { t } = useTranslation('terms');
  const history = useHistory();

  return (
    <div className={styles.wrapper}>
      <h1>{t('header')}</h1>
      <p>{t('description')}</p>
      <Button
        onClick={() => {
          history.push('/casino');
        }}
        type="submit"
      >
        {t('play_now')}
      </Button>
    </div>
  );
};

export { Header };
