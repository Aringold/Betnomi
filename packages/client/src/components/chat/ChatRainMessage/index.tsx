import React, { useState } from 'react';

import { Rain } from '@betnomi/libs/types/chat';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import { Button } from '@betnomi/libs/components';
import { ButtonColor } from '@betnomi/libs/types';
import styles from './styles.module.scss';

const RECEIVERS_MAX_COUNT = 5;

interface Props {
  sender: string;
  rain: Rain;
  message?: string;
}

export const ChatRainMessage: React.FC<Props> = ({ sender, rain, message }) => {
  const [isFullView, setIsFullView] = useState(rain.receivers.length <= RECEIVERS_MAX_COUNT);
  const receiversToShow = rain.receivers.length > RECEIVERS_MAX_COUNT && !isFullView ?
    rain.receivers.slice(0, RECEIVERS_MAX_COUNT) : rain.receivers;
  
  return (
    <div>
      <span className={styles.annotation}>
        @
        {sender}
      </span>
      {' '}
      made it rain 
      {' '}
      {`${message ? 'and left a message:' : ''}`}
      <br />
      {message ? (
        <>
          &quot;
          {message}
          &quot;
        </>
      ) : null}
      <div className={styles.amountContainer}>
        <div className={styles.title}>Congratulation!</div>
        {receiversToShow.map((receiver) => (
          <div key={receiver} className={styles.amountRow}>
            <span className={styles.annotation}>{`@${receiver}`}</span>
            <span className={styles.amount}>      
              <CoinImg imgData={rain.currency} width={16} height={16} />
            &ensp;
              {rain.amount.toFixed(3)}
            </span>
          </div>
        ))}
        {!isFullView && (
        <div className={styles.buttonWrapper}>
          <Button size={30} color={ButtonColor.Gray} fullWidth onClick={() => setIsFullView(true)}>See more</Button>
        </div>
        )}
      </div>
    </div>
  );
};
