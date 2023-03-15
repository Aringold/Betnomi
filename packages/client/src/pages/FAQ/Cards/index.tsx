import React, { FC } from 'react';
import cx from 'classnames';
import { useShallowSelector } from '../../../hooks';
import { selectAuthUI } from '../../../store/auth/selectors';

import styles from './styles.module.scss';

interface IProps {}

const Cards: FC<IProps> = () => {
  const { isChatActive } = useShallowSelector(selectAuthUI);

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.card, { [styles.isChatActive]: isChatActive })}>
        <div className={cx(styles.icon, styles.email)} />
        <div className={styles.content}>
          <h4>Email</h4>
          <p>
            For all customer queries, please email us at support@betnomi.com and
            quote your username and Player ID. For all other questions or
            offers, please email us at
            {' '}
            <a href="mailto: info@betnomi.com">info@betnomi.com</a>
          </p>
        </div>
      </div>
      <div className={cx(styles.card, { [styles.isChatActive]: isChatActive })}>
        <div className={cx(styles.icon, styles.telegram)} />
        <div className={styles.content}>
          <h4>Telegram Support</h4>
          <p>
            Write to us in the chat, we are always happy to help! 
            {' '}
            <br />
            <br />
            {' '}
            <a href="https://t.me/betnomi" target="_blank" rel="noreferrer">
              t.me/betnomi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Cards };
