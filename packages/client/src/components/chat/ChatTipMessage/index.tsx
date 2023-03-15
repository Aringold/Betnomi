import React from 'react';

import { Tip } from '@betnomi/libs/types/chat';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import { formatNumber } from 'utils/helpers';
import styles from './styles.module.scss';

interface Props {
  sender: string;
  tip: Tip;
}

export const ChatTipMessage: React.FC<Props> = ({ sender, tip }) => (
  <span className={styles.container}>
    <span className={styles.annotation}>
      @
      {sender}
      {' '}
    </span>
    sent a tip of
    {' '}
    <span className={styles.amount}>
      {formatNumber(tip.amount.toString(), 6)}
      &ensp;
      <CoinImg imgData={tip.currency} width={16} height={16} />
    </span>
    {'  '}
    to 
    {' '}
    <span className={styles.annotation}>
      @
      {tip.receiver}
    </span>
  </span>
);
