import React, {
  FC, useCallback, useEffect, useState, 
} from 'react';
import GameList, {
  Breakpoints,
} from '@betnomi/libs/components/homepage/GameList';
import { GameType, RouteGameType } from '@betnomi/libs/types/ui/games';
import GameProvider from '@betnomi/libs/components/homepage/GamesProvider';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGameToken } from '@betnomi/client/src/store/auth/actionCreators';
import { modalShow } from 'store/modal/actionCreators';
import { ModalType } from 'store/modal/types';
import classNames from 'classnames';
import useResize from '@betnomi/libs/hooks/useResize';
import {
  gameProvidersBreakpoints,
  getGames,
} from '../../containers/homepage/Games';
import {
  selectAuthTokens,
  selectAuthUI,
  selectAuth,
} from '../../store/auth/selectors';
import GameView from './GameView';
import GameBottomMenu from './GameMenu';

import { useShallowSelector } from '../../hooks';
import styles from './styles.module.scss';
import { selectIsMobile } from '../../store/global/selectors';
import { useUser } from '../../hooks/useUser';
import { useUserUI } from '../../hooks/useUserUI';
import { getGameViewSize } from '../../utils/gameViewSize';
import {
  homeGetGames,
  getRecommendationsGames,
} from '../../store/home/actionCreators';
import {
  selectHomeGames,
  selectRecommendationsGames,
} from '../../store/home/selectors';
import { selectGamesList } from '../../store/games/selectors';
import { getProviders } from '../../utils/providers';
import { FilterGameType, FilterOperators } from '../../constants/filters';
import { getGames as getGamesData } from '../../store/games/actionCreators';

interface IProps {}

const GameSlug: FC<IProps> = () => {
  const params: any = useParams();
  const history: any = useHistory();
  const dispatch = useDispatch();
  const { width, height } = useResize();
  const { state, pathname }: any = useLocation();
  const { isAuthorized } = useUser();
  const { setIsChatActive } = useUserUI();
  const gameFullScreen = useFullScreenHandle();

  const isMobile = useShallowSelector(selectIsMobile);
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const { currency } = useShallowSelector(selectAuth);
  const { game: gameData } = useShallowSelector(selectAuthTokens);
  const { game } = useShallowSelector(selectHomeGames);
  const recommendationsGames = useShallowSelector(selectRecommendationsGames);
  const games = useShallowSelector(selectGamesList);

  const [showGame, setShowGame] = useState(false);
  const [gameType, setGameType] = useState('');
  const [realPlay, setRealPlay] = useState(isAuthorized);
  const [activeScreen, setActiveScreen] = useState(false);

  const PLAY_URL = `${process.env.REACT_APP_API_URL}/api/v1/betconstruct/Play`;
  const { id: gameId } = params;
  const { gameFrameWidth, gameFrameHeight } = getGameViewSize(
    width,
    height,
    isChatActive,
    isMenuActive,
  );

  const onOpenSignInModal = useCallback(
    () => dispatch(modalShow(ModalType.SignIn)),
    [dispatch],
  );

  const handlePlayGame: any = (type: string) => {
    const gameIframe: any = document.getElementById('game');
    let gameSrc: string = '';
    setGameType(type);

    if (isAuthorized) {
      if (type === 'fun') {
        gameSrc = `${PLAY_URL}?gameId=${gameId}&openType=${type}&deviceType=1`;
      } else {
        gameSrc = `${PLAY_URL}?gameId=${gameId}&token=${gameData.GameToken}&openType=${type}&deviceType=1&playCurrency=${currency}`;
      }
      if (gameIframe && gameData.ExpiresAt > 0) {
        gameIframe.setAttribute('src', gameSrc);
        setShowGame(true);
      }
    } else if (type === 'real') {
      onOpenSignInModal();
    } else {
      gameSrc = `${PLAY_URL}?gameId=${gameId}&openType=${type}&deviceType=1`;
      if (gameIframe) {
        gameIframe.setAttribute('src', gameSrc);
        setShowGame(true);
      }
    }
  };

  const handleSetRealPlay = (newRealPlay: boolean) => {
    if (isAuthorized) {
      setRealPlay(newRealPlay);
    }
  };

  const getGameViewType = useCallback(() => {
    if (!games) return RouteGameType.Casino;
    const [currentGame] = games.filter((item) => item.game_id === gameId);
    if (!currentGame) return RouteGameType.Casino;
    const { category }: any = currentGame;
    if (category >= 1 && category <= 2) return RouteGameType.Casino;
    if (category > 2 && category <= 10) return RouteGameType.LiveCasino;
    if (category > 10 && category <= 12) return RouteGameType.Game;
    return RouteGameType.Casino;
  }, [games, gameId]);

  const getIframeStyles = (viewType: RouteGameType) => {
    if (viewType === RouteGameType.Game) {
      return {
        width: 'calc(100% - 14px)',
        height: isChatActive ? 'calc(100vh - 182px)' : 'calc(100vh - 156px)',
      };
    }
    return { width: `${gameFrameWidth}px`, height: `${gameFrameHeight}px` };
  };

  const gameViewType = getGameViewType();

  const smallScreen = window.matchMedia(
    '(min-width:768px) and (max-width: 1200px)',
  ).matches;
  const midScreen = window.matchMedia(
    '(min-width:1201px) and (max-width: 1500px)',
  ).matches;
  const gameImgSizes = {
    gameProviders: {
      width:
        midScreen && isChatActive
          ? 125
          : midScreen
            ? 135
            : isChatActive
              ? 140
              : 145,
      height:
        midScreen && isChatActive
          ? 60
          : midScreen
            ? 70
            : isChatActive
              ? 65
              : 75,
    },
    recommended: {
      width: 160,
      height: isMobile ? 220 : 250,
    },
  };

  const recommended: Breakpoints = {
    320: { slidesPerView: 2 },
    375: { slidesPerView: 2 },
    500: { slidesPerView: 3 },
    700: { slidesPerView: 4 },
    1000: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
    1440: { slidesPerView: 6 },
    1620: { slidesPerView: 7 },
    2160: { slidesPerView: 'auto' },
  };

  const recommendedLiveCasino: Breakpoints = {
    320: { slidesPerView: 2 },
    375: { slidesPerView: 2 },
    500: { slidesPerView: 3 },
    700: { slidesPerView: 4 },
    1000: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
    1440: { slidesPerView: 5 },
    1620: { slidesPerView: 5 },
    2160: { slidesPerView: 'auto' },
  };

  useEffect(() => {
    const filterData = `filter[game_id][${FilterOperators.eq}]`;
    dispatch(
      getGamesData({
        filterKey: filterData,
        params: gameId,
        filterGameType: FilterGameType.game,
      }),
    );
  }, [gameId, games]);

  useEffect(() => {
    if (isMobile) {
      if (isAuthorized && gameData.GameToken) {
        window.open(
          `${PLAY_URL}?gameId=${gameId}&token=${gameData.GameToken}&openType=real&deviceType=2&playCurrency=${currency}`,
        );
        history.push('/');
      } else {
        onOpenSignInModal();
      }
    }
  }, [isAuthorized, isMobile]);

  useEffect(() => {
    const difference = +new Date(gameData.ExpiresAt * 1000) - +new Date();
    if (difference <= 0 && isAuthorized) {
      dispatch(getGameToken());
    }
  }, []);

  useEffect(() => {
    const gameIframe: any = document.getElementById('game');
    const gameSrc: string = '';
    gameIframe.setAttribute('src', gameSrc);
    setShowGame(false);
  }, [gameId, isAuthorized]);

  useEffect(() => {
    if (showGame) {
      handlePlayGame(gameType);
    }
  }, [currency]);

  useEffect(() => {
    if (gameViewType === RouteGameType.LiveCasino && !isAuthorized) {
      onOpenSignInModal();
    } else if (
      gameViewType === RouteGameType.LiveCasino &&
      gameData.GameToken !== undefined &&
      gameData.ExpiresAt !== undefined
    ) {
      handlePlayGame('real');
    }
  }, [isAuthorized, game, gameData, gameViewType]);

  useEffect(() => {
    if (gameViewType === RouteGameType.Game) {
      setTimeout(() => setIsChatActive(false), 0);
    }
  }, [gameViewType, pathname]);

  useEffect(() => {
    const filterData = `filter[game_id][${FilterOperators.eq}]`;
    dispatch(
      homeGetGames({
        filterKey: filterData,
        params: gameId,
        filterGameType: FilterGameType.game,
      }),
    );
  }, [gameId]);

  useEffect(() => {
    const paths = pathname.split('/');

    const GameTypeParams: any = {
      casino: '1',
      'live-casino': '2',
      game: '3',
    };

    const filterData = `filter[recommendations_id][${FilterOperators.in}]`;
    dispatch(
      getRecommendationsGames({
        filterKey: filterData,
        params: GameTypeParams[String(paths[1])],
      }),
    );
  }, []);

  const handleActiveScreen = () => {
    setActiveScreen(!activeScreen);
  };

  const reportChange = useCallback(
    (newState, handle) => {
      if (handle === gameFullScreen) {
        if (!newState) {
          setActiveScreen(false);
        }
      }
    },
    [gameFullScreen],
  );

  return (
    <>
      <div
        className={classNames(styles.gameFrameWrapper, {
          [styles.isChatActive]: isChatActive,
        })}
        style={getIframeStyles(gameViewType)}
      >
        <FullScreen
          className={styles.gameFullScreen}
          handle={gameFullScreen}
          onChange={reportChange}
        >
          <GameView
            showGame={showGame}
            playGame={handlePlayGame}
            activeScreen={activeScreen}
            game={state?.game || game}
            canFunPlay={gameViewType !== RouteGameType.LiveCasino}
            setRealPlay={handleSetRealPlay}
          />
        </FullScreen>
        <GameBottomMenu
          playGame={handlePlayGame}
          handleActiveScreen={handleActiveScreen}
          handle={gameFullScreen.enter}
          canFunPlay={gameViewType !== RouteGameType.LiveCasino}
          realPlay={realPlay}
          setRealPlay={handleSetRealPlay}
        />
      </div>
      <div className={styles.page}>
        <div className={styles.list}>
          <GameList
            breakpoints={pathname.indexOf('/live-casino/') !== -1 ? recommendedLiveCasino : recommended}
            games={
              getGames(
                Object.values(recommendationsGames),
                GameType.LiveCasino,
                pathname.indexOf('/live-casino/') !== -1
                  ? { width: 250, height: 160 }
                  : { width: 220, height: 305 },
              )
            }
            gameType={GameType.RecommendedGames}
            routType={RouteGameType.Casino}
            spaceBetween={isMobile ? 12 : 24}
          />
        </div>

        <div className={styles.list}>
          <GameList
            breakpoints={gameProvidersBreakpoints}
            games={getGames(
              getProviders(),
              GameType.GameProviders,
              gameImgSizes.gameProviders,
            )}
            gameType={GameType.GameProviders}
            spaceBetween={smallScreen ? 22 : 12}
          />
        </div>

        <div className={styles.list}>
          <GameProvider isMobile={isMobile} />
        </div>
      </div>
    </>
  );
};

export default GameSlug;
