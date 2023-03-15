import React, { FC, useMemo } from 'react';
import format from 'date-fns/format';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  timestamp: number,
  isOnlyEmoji: boolean,
}

const SentMessage: FC<IProps> = ({ children, timestamp, isOnlyEmoji }) => {
  const date = useMemo(() => format(new Date(timestamp * 1000), 'HH:mm'), [timestamp]);
  return (
    <div className={styles.message}>
      <div className={styles.time}>{date}</div>
      <div className={classNames(styles.text, { [styles.emoji]: isOnlyEmoji })}>{children}</div>
    </div>
  );
};

export { SentMessage };
