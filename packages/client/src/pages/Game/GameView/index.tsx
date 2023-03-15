import React, {
  FC,
} from 'react';

import { Button } from '@betnomi/libs/components';
import cx from 'classnames';
import playIcon from '@betnomi/libs/assets/img/icons/play.svg';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../../hooks';
import { selectAuthUI } from '../../../store/auth/selectors';
import { ImgIx } from '../../../components/common/Imgix';

interface IProps {
  game: any
  activeScreen: boolean
  showGame: boolean,
  playGame: (type: string) => void,
  canFunPlay: boolean,
  setRealPlay: (newRealPlay: boolean) => void
}

const GameView: FC<IProps> = ({
  game, activeScreen, playGame, showGame, canFunPlay, setRealPlay,
}) => {
  const { t } = useTranslation();
  const { isChatActive } = useShallowSelector(selectAuthUI);

  const midScreen = window.matchMedia(
    '(min-width:1201px) and (max-width: 1500px)',
  ).matches;

  const gameFrameClasses = cx({ [styles.activeScreen]: activeScreen }, styles.gameView);
  return (
    <div className={gameFrameClasses}>
      <iframe
        id="game"
        title="title"
        src=""
        frameBorder="0"
        allowFullScreen
        className={styles.IframeWrapper}
      />
      {!showGame && (
        <>
          {(game?.background) ? (
            <ImgIx
              className={styles.bgrImage}
              src={game.background || game.img}
              sizes={midScreen && isChatActive
                ? '500px'
                : midScreen
                  ? '700px'
                  : isChatActive
                    ? '1000px'
                    : '1200px'}
              imgixParams={{ q: 10 }}
            />
          ) : <div className={styles.cap} />}
          {canFunPlay && (
            <div className={styles.gameOverlay}>
              <Button
                onClick={() => {
                  setRealPlay(true);
                  playGame('real');
                }}
                size={52}
                className={styles.mobile_width}
              >
                <img src={playIcon} width={12} height={16} alt="play btn" />
                <span>{t('Real Play')}</span>
              </Button>
              <Button
                onClick={() => {
                  setRealPlay(false);
                  playGame('fun');
                }}
                color="gray"
                size={52}
                className={styles.mobile_width}
              >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.04 7.3949L1.13091 0.122156C0.907638 -0.0262079 0.620365 -0.0407533 0.384728 0.0857924C0.147636
                    0.212338 0 0.458884 0 0.727248V15.2727C0 15.5411 0.147637 15.7876 0.384001 15.9142C0.491637 15.9716 0.609456
                    16 0.727274 16C0.868365 16 1.00946 15.9585 1.13091 15.8778L12.04 8.60508C12.2422 8.46981 12.3637 8.2429
                    12.3637 7.99999C12.3637 7.75708 12.2422 7.53017 12.04 7.3949Z"
                    fill="#C3C5CF"
                  />
                </svg>
                <span>{t('Fun Play')}</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameView;
