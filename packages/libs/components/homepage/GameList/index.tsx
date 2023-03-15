/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper/core';
import { NavigationOptions } from 'swiper/types/components/navigation';
import cx from 'classnames';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import {
  selectAuth,
  selectAuthTokens,
  selectAuthUI,
} from '@betnomi/client/src/store/auth/selectors';
import { useUser } from '@betnomi/client/src/hooks/useUser';
import { modalShow } from '@betnomi/client/src/store/modal/actionCreators';
import { ModalType } from '@betnomi/client/src/store/modal/types';
import { useDispatch } from 'react-redux';
import { GameOverlay } from '@betnomi/libs/components/GameOverlay';
import { useHistory } from 'react-router-dom';
import { selectIsMobile } from '@betnomi/client/src/store/global/selectors';
import { gameNames, GameType } from '../../../types/ui/games';
import H4 from '../../H4';
import ArrowButton, { ArrowType } from '../../ArrowButton';
import gameIcons from '../../../assets/img/games';
import styles from './styles.module.scss';

export type Breakpoints = SwiperOptions['breakpoints'];

interface Props {
  games: JSX.Element[];
  gameType: GameType;
  breakpoints?: Breakpoints;
  items?: number;
  autoFill?: boolean;
  spaceBetween?: number;
  slidesPerViewWithChatIsActive?: number;
  className?: string;
  routType?: string;
}

SwiperCore.use([Navigation]);

export const getSlidesPerView = (
  breakpoints: SwiperOptions['breakpoints'],
  isChatActive: boolean,
  gameType: string,
  isMenuActive: boolean,
) => {
  const windowInnerWidth = window.innerWidth;
  let slidesPerView: any = 'auto';
  const breakpointsWidth = breakpoints ? Object.keys(breakpoints) : [];
  if (windowInnerWidth > 768 && windowInnerWidth < 2160) {
    for (let i = 0; i < breakpointsWidth.length; i += 1) {
      if (Number(breakpointsWidth[i]) > windowInnerWidth && breakpoints) {
        const breakpoint =
          breakpoints[breakpointsWidth[i - 1]].slidesPerView || 'auto';
        if (
          windowInnerWidth >= 1920 &&
          (gameType === 'LiveCasino' ||
            gameType === 'TrendingGames' ||
            gameType === 'Slots' ||
            gameType === 'Promotions' ||
            gameType === 'RecommendedGames')
        ) {
          if (isChatActive && isMenuActive && typeof breakpoint === 'number') {
            slidesPerView = breakpoint - 1;
          } else if (isChatActive && typeof breakpoint === 'number') {
            if (gameType !== 'TrendingGames') {
              slidesPerView = breakpoint - 1;
            } else {
              slidesPerView = breakpoint;
            }
          } else {
            slidesPerView = breakpoint;
          }
        }
        if (windowInnerWidth < 1920) {
          if (isChatActive && isMenuActive && typeof breakpoint === 'number') {
            if (windowInnerWidth > 1440 && windowInnerWidth < 1640) {
              if (gameType === 'Slots') {
                slidesPerView = breakpoint - 3;
              } else if (
                gameType === 'TrendingGames' ||
                gameType === 'Promotions'
              ) {
                slidesPerView = breakpoint - 2;
              } else {
                slidesPerView = breakpoint - 1;
              }
            } else if (windowInnerWidth > 1640 && gameType === 'Slots') {
              slidesPerView = breakpoint - 2;
            } else {
              slidesPerView = breakpoint - 1;
            }
          } else if (isMenuActive && typeof breakpoint === 'number') {
            if (windowInnerWidth > 767 && windowInnerWidth < 1000) {
              if (gameType === 'TrendingGames' && windowInnerWidth < 850) {
                slidesPerView = breakpoint - 1;
              } else if (gameType === 'Slots' && windowInnerWidth < 850) {
                slidesPerView = breakpoint - 1;
              } else if (gameType === 'Promotions' && windowInnerWidth < 850) {
                slidesPerView = breakpoint - 1;
              } else {
                slidesPerView = breakpoint;
              }
            } else if (windowInnerWidth > 1000 && windowInnerWidth < 1250) {
              if (gameType === 'GameProviders') {
                slidesPerView = breakpoint - 1;
              } else if (windowInnerWidth > 1090 && gameType === 'Promotions') {
                slidesPerView = breakpoint - 1;
              } else {
                slidesPerView = breakpoint;
              }
            } else if (windowInnerWidth > 1250 && windowInnerWidth < 1720) {
              if (gameType === 'Slots') {
                slidesPerView = breakpoint - 1;
              } else {
                slidesPerView = breakpoint;
              }
            } else {
              slidesPerView = breakpoint;
            }
          } else if (isChatActive && typeof breakpoint === 'number') {
            if (gameType === 'gameCategories') {
              slidesPerView = breakpoint - 6;
            } else if (windowInnerWidth <= 999) {
              if (gameType === 'Slots') {
                slidesPerView = breakpoint - 2;
              } else if (gameType === 'TrendingGames') {
                slidesPerView = breakpoint - 2;
              } else {
                slidesPerView = breakpoint - 1;
              }
            } else if (
              windowInnerWidth > 1000 &&
              windowInnerWidth < 1250 &&
              gameType === 'GameProviders'
            ) {
              slidesPerView = breakpoint - 3;
            } else if (
              windowInnerWidth > 1250 &&
              windowInnerWidth < 1640 &&
              gameType === 'Slots'
            ) {
              slidesPerView = breakpoint - 2;
            } else {
              slidesPerView = breakpoint - 1;
            }
          } else if (windowInnerWidth > 768 && windowInnerWidth < 1445) {
            if (gameType === 'Slots' || gameType === 'TrendingGames') {
              if (typeof breakpoint === 'number') {
                slidesPerView = breakpoint + 1;
              }
            } else {
              slidesPerView = breakpoint;
            }
          } else {
            slidesPerView = breakpoint;
          }
          break;
        }
      }
    }
  } else {
    breakpointsWidth.forEach((breakpointWidth) => {
      if (breakpoints && windowInnerWidth >= Number(breakpointWidth)) {
        slidesPerView = breakpoints[breakpointWidth]?.slidesPerView;
      }
    });
  }
  return slidesPerView ?? 'auto';
};

const GameList: FC<PropsWithChildren<Props>> = ({
  routType,
  games,
  gameType,
  breakpoints,
  spaceBetween = 24,
  className,
}) => {
  const navigation: NavigationOptions = {
    prevEl: `.prev-${gameType}`,
    nextEl: `.next-${gameType}`,
  };
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const isMobile = useShallowSelector(selectIsMobile);
  const [leftBorderDisabled] = useState(true);
  const [rightBorderDisabled] = useState(true);

  const dispatch = useDispatch();
  const { isAuthorized } = useUser();
  const { currency } = useShallowSelector(selectAuth);
  const { game: gameData } = useShallowSelector(selectAuthTokens);
  const history = useHistory();
  const PLAY_URL = `${process.env.REACT_APP_API_URL}/api/v1/betconstruct/Play`;

  const onOpenSignInModal = useCallback(
    () => dispatch(modalShow(ModalType.SignIn)),
    [dispatch],
  );

  const [activeGame, setActiveGame] = useState();
  const handlePlayGame = (game: any, gameTypeName?: string) => {
    if (gameTypeName !== GameType.GameProviders) {
      if ((game && game.id !== '') || (game && game.front_game_id !== '')) {
        if (isMobile) {
          if (isAuthorized) {
            window.open(
              `${PLAY_URL}?gameId=${game.game_id ?? game.id}&token=${gameData.GameToken}&openType=real&deviceType=2&playCurrency=${currency}`,
            );
          } else {
            onOpenSignInModal();
            setActiveGame(game);
          }
        } else {
          history.push({
            pathname: `/${routType ?? game.type}/${game.game_id ?? game.id}`,
            state: { game },
          });
        }
      }
    } else {
      history.push({
        pathname: `/${game.gameProviderType}`,
        state: { game },
      });
    }
  };

  useEffect(() => {
    if (isAuthorized && activeGame && gameData.GameToken) {
      handlePlayGame(activeGame);
    }
  }, [isAuthorized, gameData.GameToken]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H4 className={styles.text_center}>
          {gameIcons[gameType] && (
            <img
              src={gameIcons[gameType]}
              alt={gameType}
              className={styles.icon}
            />
          )}
          <span className={styles.header_text}>{gameNames[gameType]}</span>
        </H4>
        <div className={styles.buttons}>
          <ArrowButton
            type={ArrowType.left}
            className={cx(`prev-${gameType}`, styles.right_margin, 'prev-btn')}
          />
          <ArrowButton className={`next-${gameType}`} />
        </div>
      </div>
      <Swiper
        slidesPerView={getSlidesPerView(
          breakpoints,
          isChatActive,
          gameType,
          isMenuActive,
        )}
        spaceBetween={spaceBetween}
        navigation={navigation}
        observeParents
        resizeObserver
        watchOverflow
      >
        <div
          className={cx(
            styles.gradient_border,
            styles.left,
            leftBorderDisabled ? styles.disabled : '',
          )}
        />
        <div
          className={cx(
            styles.gradient_border,
            styles.right,
            rightBorderDisabled ? styles.disabled : '',
          )}
        />
        {games.map((game, index) => (
          <SwiperSlide key={`${index}-${gameType}`}>
            {gameType === 'Promotions' ? (
              game
            ) : (
              <div
                onClick={() => handlePlayGame(game.props.game, gameType)}
                className={cx(styles.gameListItem, className)}
              >
                {game}
                {gameType !== 'GameProviders' && !isMobile && (
                  game.props.game && <GameOverlay className={styles.overlay} />
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameList;
