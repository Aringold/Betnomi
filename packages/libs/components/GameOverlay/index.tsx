import React, { FC } from 'react';
import cx from 'classnames';
import playIcon from '@betnomi/libs/assets/img/icons/play.svg';
import styles from './styles.module.scss';

interface IProps {
  className?: string
  handlePlayGame?: () => void
}

const GameOverlay: FC<IProps> = ({ className, handlePlayGame }) => (
  // eslint-disable-next-line
  <div className={cx(styles.gameOverlay, className)} onClick={handlePlayGame}>
    <button className={styles.playBtn}>
      <img className={styles.playIcon} src={playIcon} alt="play btn" />
    </button>
  </div>
);

export { GameOverlay };
