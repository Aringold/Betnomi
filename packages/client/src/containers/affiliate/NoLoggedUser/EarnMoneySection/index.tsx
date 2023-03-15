import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import chart from '@betnomi/libs/assets/img/affiliate/chart.png';
import Button from '@betnomi/libs/components/Button';

import chartCol from '@betnomi/libs/assets/img/affiliate/chartCol.png';
import { useUserUI } from '../../../../hooks/useUserUI';
import { modalShow } from '../../../../store/modal/actionCreators';
import { ModalType } from '../../../../store/modal/types';

import styles from './styles.module.scss';

const EarnMoneySection: FC = () => {
  const { t } = useTranslation('affiliate');
  const dispatch = useDispatch();
  const {
    setIsMenuActive,
  } = useUserUI();

  const onOpenSignInModal = useCallback(
    () => {
      dispatch(modalShow(ModalType.SignIn));
      setIsMenuActive(false);
    }, [dispatch],
  );

  return (
    <section className={styles.earnMoney}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h2 className={styles.title}>
            <span>{t('Earn Money')}</span>
            <span>
              {t('Up to 50%')}
            </span>
          </h2>
          <p className={styles.text}>{t('Once you\'re signed up you\'ll be able to place our banners on your website')}</p>
          <Button
            type="button"
            onClick={onOpenSignInModal}
            className={styles.view_button}
          >
            {t('View Tools')}
          </Button>
        </div>

        <span className={styles.chartImages}>
          <img src={chart} alt="chart" className={styles.pointer} />
          <img src={chartCol} alt="team" />
        </span>
      </div>
    </section>
  );
};

export { EarnMoneySection };
