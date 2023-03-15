import React from 'react';
import { Coin } from '@betnomi/libs/components';
import { CoinType } from '@betnomi/libs/types/ui';
import { values } from 'ramda';
import { useShallowSelector } from '../../../hooks';
import { selectAuthUI } from '../../../store/auth/selectors';

import styles from './styles.module.scss';

const CoinsContainer: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1160px)').matches;
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  return (
    <div className={styles.container}>
      {values(CoinType).map((el) => (
        <Coin
          coin={el}
          key={el}
          className={styles.coin}
          size={isMobile || (smallScreen && (isChatActive || isMenuActive)) ? 24 : 44}
        />
      )).slice(0, -3)}
    </div>
  );
};

export default CoinsContainer;
