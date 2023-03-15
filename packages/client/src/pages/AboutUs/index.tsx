import React, { FC, useEffect } from 'react';
import { useTranslation } from '@betnomi/libs/utils/i18n';

import { ReactComponent as TradesIcon } from '@betnomi/libs/assets/img/aboutUs/trades.svg';
import { ReactComponent as SupportIcon } from '@betnomi/libs/assets/img/aboutUs/support.svg';
import { ReactComponent as ReliabilityIcon } from '@betnomi/libs/assets/img/aboutUs/reliability.svg';
import { ReactComponent as CategoriesIcon } from '@betnomi/libs/assets/img/aboutUs/categories.svg';
import cx from 'classnames';
import { Button } from '@betnomi/libs/components';

import styles from './styles.module.scss';
import { useShallowSelector } from '../../hooks';
import { selectAuthUI } from '../../store/auth/selectors';
import { useUserUI } from '../../hooks/useUserUI';

const AboutUs: FC = () => {
  const { t } = useTranslation('main');
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.page}>
      <div className={cx(styles.contentItem, styles.mainContentItem, { [styles.active]: isChatActive })}>
        <div>
          <h1>About US</h1>
          <p>
            Hey! Welcome to Betnomi, the leading crypto gaming and betting site with a variety of sports to gamble on, tons of games from the industry’s top-rated providers, and all the slots you can ever imagine.
          </p>
          <p>
            We are licensed and fully regulated by the government of Curaçao, which makes your gambling journey 100% legal and safe. On top of that, we offer high-tech solutions and an outstanding player experience on your PCs and mobile devices that will exceed your expectations.
          </p>
        </div>

        <Button
          className={styles.button}
        >
          {t('Start Now')}
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.contentItem}>
          <SupportIcon />
          <div>
            <h2>24/7 SUPPORT</h2>
            <p>
              Our Customer Support is here round the clock to answer your questions and help you along your gaming journey. Start a chat now or give us a free Internet call.
            </p>
          </div>
        </div>

        <div className={styles.contentItem}>
          <TradesIcon />
          <div>
            <h2>300+ TRADERS</h2>
            <p>
              Live games in Betnomi are individually managed by over 300 traders, who use high-tech automated tools for market administration, and odds setting.
            </p>
          </div>
        </div>

        <div className={styles.contentItem}>
          <CategoriesIcon />
          <div>
            <h2>50+ CATEGORIES</h2>
            <p>
              Betnomi accepts bets on more than 50 categories of sporting events, games, political races, TV and electronic tournaments.
            </p>
          </div>
        </div>

        <div className={styles.contentItem}>
          <ReliabilityIcon />
          <div>
            <h2>RELIABILITY</h2>
            <p>
              We hold an ISO/IEC XXXXX:20XX certificate that belongs to the family of standards allowing us to maintain the highest level of information security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
