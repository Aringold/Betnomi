/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC } from 'react';
import cx from 'classnames';
import { Toggle } from '@betnomi/libs/components/Toggle';

import { ReactComponent as SizeScreenIcon } from '@betnomi/libs/assets/img/icons/sizescreen.svg';
import { ReactComponent as FullscreenIcon } from '@betnomi/libs/assets/img/icons/fullscreen.svg';
import { ReactComponent as FavoriteIcon } from '@betnomi/libs/assets/img/icons/favorite.svg';
import { ReactComponent as StatsIcon } from '@betnomi/libs/assets/img/icons/stats.svg';
import { useUserUI } from '../../../hooks/useUserUI';
import { useModal } from '../../../hooks/useModal';
import { ModalType } from '../../../store/modal/types';

import styles from './styles.module.scss';

interface IProps {
  handle: () => void
  handleActiveScreen: () => void,
  playGame: (type: string) => void,
  canFunPlay: boolean,
  realPlay: boolean,
  setRealPlay: (newRealPlay: boolean) => void,
}

const GameMenu: FC<IProps> = ({
  handle, handleActiveScreen, playGame, canFunPlay, realPlay, setRealPlay,
}) => {
  const { showModal } = useModal();

  const {
    isChatActive, isMenuActive, setIsMenuActive, setIsChatActive,
  } = useUserUI();

  const toggleWithRates = () => {
    setRealPlay(!realPlay);
    !realPlay ? playGame('real') : playGame('fun');
  };

  const handleClickTheatreView = () => {
    if (!isChatActive && !isMenuActive) {
      setIsChatActive(true);
      return;
    }

    setIsMenuActive(false);
    setIsChatActive(false);
  };

  const handleFullScreen = () => {
    handle();
    handleActiveScreen();
  };
  const handleOpenLiveStats = () => {
    showModal(ModalType.GameLiveStats)();
  };

  return (
    <div className={styles.gameMenuWrap}>
      <div className={styles.gameOptions}>
        <FullscreenIcon onClick={handleFullScreen} />
        <SizeScreenIcon onClick={handleClickTheatreView} />
        <StatsIcon onClick={handleOpenLiveStats} />
        <FavoriteIcon />
      </div>
      {canFunPlay && (
        <div className={styles.toggleWrap}>
          <span className={cx({ [styles.active]: !realPlay })}> Fun Play </span>
          <Toggle value={realPlay} onChange={toggleWithRates} />
          <span className={cx({ [styles.active]: realPlay })}> Real Play </span>
        </div>
      )}
      
      {/* <div className={styles.gameInfo}> */}
      {/*    <p className={cx(styles.gameName, styles.confirmed)}> */}
      {/*        <img src={imgConfirmed} alt="confirmed icon" /> */}
      {/*        <span> Provably Fairness</span> */}
      {/*    </p> */}
      {/*    <span className={styles.line}>{''}</span> */}
      {/*   <p className={styles.gameName}>Blast Game</p> */}
      {/* </div> */}
    </div>
  );
};

export default GameMenu;
