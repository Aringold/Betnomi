/* eslint-disable react/no-array-index-key */
import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import GameList, {
// Breakpoints,
} from '@betnomi/libs/components/homepage/GameList';
import cx from 'classnames';
import { GameType } from '@betnomi/libs/types/ui/games';
import { GameOverlay } from '@betnomi/libs/components/GameOverlay';
import H4 from '@betnomi/libs/components/H4';
import { useHistory } from 'react-router-dom';
import { usePagination } from 'hooks/usePagination';
import { Loading } from '@betnomi/libs/components/Loading';
import {
  gameProvidersBreakpoints,
  getGames,
} from '../../containers/homepage/Games';
import { selectHomeGames } from '../../store/home/selectors';
import { selectAuthUI } from '../../store/auth/selectors';
import { useShallowSelector } from '../../hooks';
import { useTranslation } from '../../i18n';
import { LoadMore } from '../Casino/Content/LoadMore';

import { FilterGameType, FilterOperators } from '../../constants/filters';
import { homeGetGames } from '../../store/home/actionCreators';
import { ImgIx } from '../../components/common/Imgix';
import styles from './styles.module.scss';
import { getProviders } from '../../utils/providers';

interface IProps {}

const Games: FC<IProps> = () => {
  const { isLoading, gamesPage } = useShallowSelector(selectHomeGames);
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const gridRef = useRef<HTMLDivElement | null>(null);

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
    promotions: {
      width: midScreen ? 320 : 300,
      height: midScreen ? 170 : 180,
    },
  };
  // May be useful in the future.
  // const promotionsBreakpoints: Breakpoints = {
  //   375: { slidesPerView: 1 },
  //   720: { slidesPerView: 1 },
  //   1000: { slidesPerView: 2 },
  //   1280: { slidesPerView: 3 },
  //   1440: { slidesPerView: 3 },
  //   1620: { slidesPerView: 4 },
  //   2160: { slidesPerView: 'auto' },
  // };

  const history = useHistory();
  const handlePlayGame = (game: any) => {
    if (!game.id) {
      history.push({
        pathname: `/game/${Math.random().toString(36).substr(2, 9)}`,
        state: { game, from: 'games' },
      });
      return;
    }
    history.push(`/game/${game.game_id}`);
  };

  const getGamesData = (limit: number, offset: number) => {
    const filterData = `filter[category][${FilterOperators.eq}]`;
    dispatch(homeGetGames({
      published: 'published',
      filterKey: filterData,
      params: '11',
      meta: 'filter_count',
      limit,
      offset,
      filterGameType: FilterGameType.gamesPage,
    }));
  };

  const { visibleSource, handleLoadMore } = usePagination(gamesPage.list, gridRef, getGamesData, isLoading);

  return (
    <>
      <div className={styles.gamesHead}>
        <H4 className={styles.text_center}>{t('Games')}</H4>
        <p className={styles.subTitle}>{t('Your favorite activities in one place')}</p>
      </div>

      <div className={styles.page}>
        <div className={styles.list}>
          <div ref={gridRef} className={styles.mustPlayList}>
            {
              visibleSource.length ? (
                visibleSource.map((item, index) => (
                  <div key={`${index}_game`} className={styles.listItem}>
                    <ImgIx className={styles.gameCategory} src={item.thumbnail ?? 'default'} width={188} />
                    <GameOverlay
                      handlePlayGame={() => handlePlayGame(item)}
                      className={styles.overlay}
                    />
                  </div>
                ))) : null
            }
          </div>
          {
            !visibleSource.length && (
              <div className={styles.loading}>
                <Loading />
              </div>
            )
          }
        </div>
        {visibleSource.length ? (
          <LoadMore
            totalItemsCount={gamesPage.meta.filter_count}
            loadedItemsCount={visibleSource.length}
            loadMoreHandler={handleLoadMore}
            isLoading={isLoading}
          />
        ) : null}

        <div className={cx(styles.list, styles.addMargin)}>
          <GameList
            breakpoints={gameProvidersBreakpoints}
            games={getGames(getProviders(), GameType.GameProviders, gameImgSizes.gameProviders)}
            gameType={GameType.GameProviders}
            spaceBetween={smallScreen ? 22 : 12}
          />
        </div>

        {/* {!isMobile && (
          <div className={styles.list}>
            <GameList
              breakpoints={promotionsBreakpoints}
              games={
                isLoading
                  ? generatePlaceholders(350, 220)
                  : getPromotions(PromotionLocal, gameImgSizes.promotions)
              }
              gameType={GameType.Promotions}
              spaceBetween={smallScreen ? 22 : 12}
              slidesPerViewWithChatIsActive={4}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default Games;
