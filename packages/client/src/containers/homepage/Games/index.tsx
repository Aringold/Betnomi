/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  FC, useEffect, useState,
} from 'react';
import cx from 'classnames';
import BannerList from '@betnomi/libs/components/homepage/BannerList';
import GameList, {
  Breakpoints,
} from '@betnomi/libs/components/homepage/GameList';
import { GameType, RouteGameType } from '@betnomi/libs/types/ui/games';
import GameCategoriesList from '@betnomi/libs/components/homepage/GameCategoriesList';
import { useCategories } from '@betnomi/libs/hooks/useCategories';
import { useDispatch } from 'react-redux';
import GameBanner from '@betnomi/libs/components/GameBanner';
import GameProvider from '@betnomi/libs/components/homepage/GamesProvider';
import { Promotions } from '@betnomi/libs/components/Promotions';
import Union from '@betnomi/libs/assets/img/promotions/Union.png';
import SummerDots from '@betnomi/libs/assets/img/promotions/background2.png';
import Ellips from '@betnomi/libs/assets/img/promotions/Ellipse1.png';
import Round1 from '@betnomi/libs/assets/img/promotions/Round1.png';
import BackgroundImage from '@betnomi/libs/assets/img/promotions/background1.png';
import Ellips2 from '@betnomi/libs/assets/img/promotions/Ellips2.png';
import Round2 from '@betnomi/libs/assets/img/promotions/Round2.png';

import { DesktopButton as SupportIcon } from 'components/layout/Support/Buttons/DesktopButton';
import { useHistory } from 'react-router';
import { Routes } from 'constants/routes';
import Skeleton from '@betnomi/libs/components/Skeleton';
import { selectAuthUI } from '../../../store/auth/selectors';
import { selectHomeBanners, selectHomeGames } from '../../../store/home/selectors';
import { selectGamesList } from '../../../store/games/selectors';
import { useShallowSelector } from '../../../hooks';
import { Game } from '../../../store/home/types';
import { fetchBanners, homeGetGames } from '../../../store/home/actionCreators';

import styles from './styles.module.scss';
import { slotsData, trendingData, liveCasinoData } from '../../../constants/homePageGames';
import { FilterGameType, FilterOperators } from '../../../constants/filters';

import { getProviders } from '../../../utils/providers';

interface IProps {
  isMobile: boolean;
}
interface ILocalGame {
  type: boolean;
  bgImage: string;
  elipisis: string;
  bgColor: string;
  title: string;
  para: string;
  round: string | null;
}

export const PromotionLocal = [
  {
    type: false,
    bgImage: BackgroundImage,
    elipisis: Ellips,
    round: Round1,
    bgColor: '#6B59D9',
    title: 'Twin Welcome Pack',
    para: 'Get up to 100 free spins in Book of Dead',
  },
  {
    type: true,
    bgImage: SummerDots,
    elipisis: Union,
    round: null,
    bgColor: '#63A5F1',
    title: 'Summer of Love',
    para: 'Trigger a share of 0.100000 bitcoin with any bet in selected slots.',
  },
  {
    type: false,
    bgImage: BackgroundImage,
    elipisis: Ellips2,
    round: Round2,
    bgColor: '#3EBBA9',
    title: 'Twin Welcome Pack',
    para: 'Get up to 100 free spins in Book of Dead',
  },
  {
    type: true,
    bgImage: SummerDots,
    elipisis: Union,
    round: null,
    bgColor: '#63A5F1',
    title: 'Summer of Love',
    para: 'Trigger a share of 0.100000 bitcoin with any bet in selected slots.',
  },
  {
    type: false,
    bgImage: BackgroundImage,
    elipisis: Ellips2,
    round: Round2,
    bgColor: '#3EBBA9',
    title: 'Twin Welcome Pack',
    para: 'Get up to 100 free spins in Book of Dead',
  },
  {
    type: true,
    bgImage: SummerDots,
    elipisis: Union,
    round: null,
    bgColor: '#63A5F1',
    title: 'Summer of Love',
    para: 'Trigger a share of 0.100000 bitcoin with any bet in selected slots.',
  },
];

const trendingBreakpoints: Breakpoints = {
  320: { slidesPerView: 2 },
  375: { slidesPerView: 2 },
  500: { slidesPerView: 3 },
  660: { slidesPerView: 4 },
  720: { slidesPerView: 4 },
  1000: { slidesPerView: 4 },
  1170: { slidesPerView: 5 },
  1200: { slidesPerView: 5 },
  1280: { slidesPerView: 5 },
  1366: { slidesPerView: 6 },
  1440: { slidesPerView: 6 },
  1620: { slidesPerView: 6 },
  2160: { slidesPerView: 'auto' },
};

const slotsBreakpoints: Breakpoints = {
  320: { slidesPerView: 2 },
  375: { slidesPerView: 2 },
  500: { slidesPerView: 4 },
  650: { slidesPerView: 5 },
  700: { slidesPerView: 5 },
  1000: { slidesPerView: 5 },
  1170: { slidesPerView: 6 },
  1200: { slidesPerView: 6 },
  1280: { slidesPerView: 7 },
  1366: { slidesPerView: 8 },
  1440: { slidesPerView: 8 },
  1640: { slidesPerView: 8 },
  1760: { slidesPerView: 8 },
  1930: { slidesPerView: 8 },
  2160: { slidesPerView: 'auto' },
};

const liveCasinoBreakpoints: Breakpoints = {
  320: { slidesPerView: 1 },
  360: { slidesPerView: 1 },
  375: { slidesPerView: 1 },
  500: { slidesPerView: 2 },
  700: { slidesPerView: 2 },
  1000: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
  1440: { slidesPerView: 4 },
  1620: { slidesPerView: 5 },
  2160: { slidesPerView: 'auto' },
};

export const gameProvidersBreakpoints: Breakpoints = {
  320: { slidesPerView: 3 },
  460: { slidesPerView: 4 },
  620: { slidesPerView: 5 },
  880: { slidesPerView: 6 },
  1000: { slidesPerView: 7 },
  1100: { slidesPerView: 8 },
  1440: { slidesPerView: 9 },
  1620: { slidesPerView: 10 },
  2160: { slidesPerView: 'auto' },
};

const promotionsBreakpoints: Breakpoints = {
  320: { slidesPerView: 1 },
  360: { slidesPerView: 1 },
  375: { slidesPerView: 1 },
  620: { slidesPerView: 2 },
  768: { slidesPerView: 2 },
  1000: { slidesPerView: 2 },
  1090: { slidesPerView: 3 },
  1280: { slidesPerView: 3 },
  1440: { slidesPerView: 3 },
  1536: { slidesPerView: 4 },
  2160: { slidesPerView: 'auto' },
};

export const getPromotions = (gameList: ILocalGame[], imgSizes = {}) =>
  PromotionLocal.map((game) => (
    <Promotions
      type={game.type}
      bgImage={game.bgImage}
      elipisis={game.elipisis}
      bgColor={game.bgColor}
      round={game.round}
      title={game.title}
      para={game.para}
    />
  ));

export const getGames = (gameList: Game[], gameType: string = '', imgSizes: { width: number, height?: number }, imgixParams?: any) => {
  let renderList = gameList;
  if (gameList.length === 0) {
    renderList = new Array(10).fill((null) as unknown as Game);
  }

  return renderList.map((game) => (
    <GameBanner
      image={game?.thumbnail || game?.asset || 'default'}
      key={game?.id}
      imgixParams={imgixParams}
      width={imgSizes.width}
      height={imgSizes.height}
      game={game}
    />
  ));
};

const Games: FC<IProps> = ({ isMobile }) => {
  const dispatch = useDispatch();
  const {
    slots,
    liveCasino, 
    trending,
  } = useShallowSelector(selectHomeGames);
  
  const games = useShallowSelector(selectGamesList);

  const history = useHistory();
  const categories = useCategories();
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const banners = useShallowSelector(selectHomeBanners);

  const isSmallImage = isMobile;

  const loadDefaultBanner = () => {
    let homeBanner = null;
    if (banners) {
      if (banners.length > 0) {
        if (isSmallImage) {
          homeBanner = banners[1] || {};
        } else {
          homeBanner = banners[0] || {};
        }
      } else {
        homeBanner = null;
      }
    }
    return banners.length > 0 ? 
      (isSmallImage ? [banners[1]] : [banners[0]]) : (homeBanner ? [homeBanner] : []);
  };

  const homeBanner = loadDefaultBanner();

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
              : isMobile
                ? 70
                : 75,
    },
  };

  const onMoreClick = () => history.push(Routes.PromotionsLanding);

  // const filterNeededIds = (ids: string[]) => {
  //   if (!games) return ids;
  //
  //   const neededIds = [...ids];
  //
  //   games.map((game) => {
  //     const index = neededIds.indexOf(game.game_id ? game.game_id : '');
  //     if (index > -1) neededIds.splice(index, 1);
  //     return game;
  //   });
  //
  //   return neededIds;
  // };

  useEffect(() => {
    const trendingIds = Object.values(trendingData).map(({ id }) => id);
    const slotsIds = Object.values(slotsData).map(({ id }) => id);
    const liveCasinoIds = Object.values(liveCasinoData).map(({ id }) => id);
    const filterData = `filter[game_id][${FilterOperators.in}]`;

    // const neededIds = filterNeededIds([...trendingIds, ...slotsIds, ...liveCasinoIds]);

    dispatch(homeGetGames({
      filterKey: filterData,
      params: `${slotsIds},${trendingIds},${liveCasinoIds}`,
      filterGameType: FilterGameType.homePage,
    }));
    dispatch(fetchBanners());
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <>
      <div className={cx(styles.banners, { [styles.desktopBanner]: !isSmallImage }, 'game-banner-wrapper')}>
        {homeBanner.length > 0 ? (
          <BannerList
            items={1}
            banners={homeBanner}
            isSmall={isSmallImage}
            onMoreClick={onMoreClick}
          />
        ) : <Skeleton width={isSmallImage ? 700 : 1400} height={isSmallImage ? 355 : 384} />}
      </div>
      <hr className={styles.hr} />
      <div className={styles.categories}>
        <GameCategoriesList spaceBetween={12} categories={categories} />
      </div>
      <hr className={styles.hr} />
      <div className={styles.games}>
        <div className={styles.list}>
          <GameList
            breakpoints={trendingBreakpoints}
            games={getGames(
              isMobile ? trending.slice(0, 4) : trending,
              GameType.TrendingGames,
              { width: 220, height: 305 },
            )}
            gameType={GameType.TrendingGames}
            routType={RouteGameType.Casino}
            spaceBetween={12}
            slidesPerViewWithChatIsActive={5}
          />
        </div>
        <div className={styles.list}>
          <GameList
            breakpoints={slotsBreakpoints}
            games={getGames(
              isMobile ? slots.slice(0, 4) : slots,
              GameType.Slots,
              { width: isMobile ? 220 : 168, height: isMobile ? 305 : 233 },
            )}
            gameType={GameType.Slots}
            routType={RouteGameType.Casino}
            spaceBetween={12}
            slidesPerViewWithChatIsActive={7}
          />
        </div>
        <div className={cx(styles.list, styles.addMargin)}>
          <GameList
            breakpoints={liveCasinoBreakpoints}
            games={getGames(
              isMobile ? liveCasino.slice(0, 4) : liveCasino,
              GameType.LiveCasino,
              { width: 350, height: 232 },
            )}
            gameType={GameType.LiveCasino}
            routType={RouteGameType.LiveCasino}
            spaceBetween={12}
            slidesPerViewWithChatIsActive={4}
          />
        </div>
        <div className={styles.list}>
          <GameProvider isMobile={isMobile} />
        </div>
        <div className={cx(styles.list, styles.addMarginLast)}>
          <GameList
            breakpoints={gameProvidersBreakpoints}
            games={getGames(
              getProviders(),
              GameType.GameProviders,
              gameImgSizes.gameProviders,
            )}
            gameType={GameType.GameProviders}
            spaceBetween={12}
          />
        </div>
        {/* may come in the future */}

        {/* <div className={styles.list}>
          <GameList
            breakpoints={promotionsBreakpoints}
            games={
              isLoading
                ? generatePlaceholders(350, 220)
                : getPromotions(PromotionLocal, gameImgSizes.promotions)
            }
            gameType={GameType.Promotions}
            spaceBetween={12}
            slidesPerViewWithChatIsActive={4}
            aspectRatio={350 / 220}
          />
        </div> */}
      </div>
      {!isMobile ? <SupportIcon /> : null}
    </>
  );
};
export default Games;
