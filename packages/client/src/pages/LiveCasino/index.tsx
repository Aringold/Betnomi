import React, {
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useShallowSelector } from 'hooks';
import { selectIsMobile } from 'store/global/selectors';
import GameList from '@betnomi/libs/components/homepage/GameList';
import {
  gameProvidersBreakpoints,
  getGames,
} from 'containers/homepage/Games';
import {
  selectAssets,
  selectGamesForSearch,
  selectHomeGames,
  selectProviders,
} from 'store/home/selectors';
import { selectAuthUI } from 'store/auth/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GameType } from '@betnomi/libs/types/ui/games';
import { LoadMore } from 'pages/Casino/Content/LoadMore';
import { SearchPanel } from 'pages/Casino/Content/SearchPanel';
import { GameOverlay } from '@betnomi/libs/components/GameOverlay';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { usePagination } from 'hooks/usePagination';
import { Loading } from '@betnomi/libs/components/Loading';
import tabs from './tabs';
import { optionsSportBetResult } from '../Casino/LiveCasinoPageProviders';

import { FilterGameType, FilterOperators } from '../../constants/filters';
import { getProviders } from '../../utils/providers';
import {
  getGameProviders,
  getGamesForSearch,
  homeGetGames,
  homeSetGames,
} from '../../store/home/actionCreators';
import { ImgIx } from '../../components/common/Imgix';
import styles from './styles.module.scss';

interface IProps {}

const LiveCasino: FC<IProps> = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { isLoading, liveCasinoData } = useShallowSelector(selectHomeGames);
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const { assetList } = useShallowSelector(selectAssets);
  const { searchGames } = useShallowSelector(selectGamesForSearch);
  const { list: providersState } = useShallowSelector(selectProviders);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePlayGame = (game: any) => {
    if (!game.game_id) {
      history.push({
        pathname: `live-casino/${Math.random().toString(36).substr(2, 9)}`,
        state: { game, from: 'games' },
      });
      return;
    }
    history.push(`live-casino/${game.game_id}`);
  };

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
  };
  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => () => {
    dispatch(homeSetGames({
      liveCasinoData: {
        list: [],
        meta: {
          filter_count: 0,
        },
      },
    }));
  }, []);

  const handleSelectedProviders = (selectedProviders: string[]) => {
    setProviders(selectedProviders);
    dispatch(homeSetGames({
      liveCasinoData: {
        list: [],
        meta: {
          filter_count: 0,
        },
      },
    }));
  };

  const getCasinoGames = (limit: number, offset: number) => {
    const filterData = `filter[provider_title][${FilterOperators.in}]`;
    dispatch(homeGetGames({
      published: 'published',
      filterKey: filterData,
      params: providers.length
        ? providers.indexOf('All') !== -1
          ? providers.join(',')
          : 'Evolution'
        : 'Evolution',
      meta: 'filter_count',
      limit,
      offset,
      filterGameType: FilterGameType.liveCasino,
    }));
  };

  const { visibleSource, handleLoadMore } = usePagination(liveCasinoData.list, gridRef, getCasinoGames, isLoading, false);

  const handleSearch = (value: string) => {
    const filterData = `filter[name][${FilterOperators.contains}]`;
    dispatch(getGamesForSearch({
      published: 'published',
      filterSearchProvider: 'Evolution',
      filterKey: filterData,
      params: value,
      meta: 'filter_count',
      limit: 15,
    }));
  };

  useEffect(() => {
    dispatch(getGameProviders({
      published: 'published',
      filterKey: '',
      aggregate: 'id',
      groupBy: 'provider_title',
    }));
  }, []);

  const getOptionsSportBetResult = useMemo(() => {
    const CMSProviders = providersState
      .filter((filter) => optionsSportBetResult
        .find(({ value }) => filter.provider_title === value)).map((item) => ({
        label: item.provider_title,
        games: item.count.id,
        value: item.provider_title,
      }));

    let allCount = 0;
    /* eslint-disable-next-line */
    for (let prop in CMSProviders) {
      allCount += CMSProviders[prop].games;
    }

    return [{ label: 'All', games: allCount, value: 'All' }, ...CMSProviders];
  }, [providersState]);

  const getTabs = useMemo(() => {
    let res = [];
    res = tabs.map((obj: any) => {
      const index = assetList.findIndex((el: any) => el.id === obj.id);
      const asset = index !== -1 ? assetList[index].asset : '';
      return {
        ...obj,
        img: asset,
      };
    });
    return res;
  }, [assetList.length]);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Swiper
          slidesPerView={isMobile ? 4 : 'auto'}
          spaceBetween={isMobile ? 8 : 24}
          observeParents
          resizeObserver
          className={styles.swiper}
        >
          {
            getTabs.map((tab) => (
              <SwiperSlide style={{ maxWidth: '190px', width: isMobile ? undefined : '100%' }} key={tab.id}>
                <div className={styles.tabWrapper}>
                  {
                    tab.img ?
                      <ImgIx className={styles.tab} src={tab.img ?? 'default'} width={34} /> : null
                  }
                  <span>{tab.name}</span>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <SearchPanel
        optionsSportBetResult={getOptionsSportBetResult}
        serchData={searchGames.list}
        onChangeSearch={handleSearch}
        onSelectedProviderChange={handleSelectedProviders}
        thumbnailWidth={100}
        thumbnailHeight={60}
        onSelectSearch={handlePlayGame}
      />

      <div className={styles.list}>
        <div ref={gridRef} className={styles.mustPlayList}>
          {
              visibleSource.length ? (
                visibleSource.map((item) => (
                  <div key={item.id} className={styles.listItem}>
                    <ImgIx
                      src={item.thumbnail ?? 'default'}
                      className={styles.gameCategory}
                      width={250}
                      imgixParams={{ ar: '250:166' }}
                    />
                    <GameOverlay
                      handlePlayGame={() => handlePlayGame(item)}
                      className={styles.overlay}
                    />
                  </div>
                )))
                : null
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
          totalItemsCount={liveCasinoData.meta.filter_count}
          loadedItemsCount={visibleSource.length}
          isLoading={isLoading}
          loadMoreHandler={handleLoadMore}
        />
      ) : null}
      <div className={styles.marginBottom}>
        <GameList
          breakpoints={gameProvidersBreakpoints}
          games={getGames(getProviders(), GameType.GameProviders, gameImgSizes.gameProviders)}
          gameType={GameType.GameProviders}
          spaceBetween={smallScreen ? 22 : 12}
        />
      </div>
    </div>
  );
};

export default LiveCasino;
