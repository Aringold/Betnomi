import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import GameList from '@betnomi/libs/components/homepage/GameList';
import { GameType } from '@betnomi/libs/types/ui/games';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import BannerList from '@betnomi/libs/components/Casino/BannerList';
import { GameOverlay } from '@betnomi/libs/components/GameOverlay';
import popularIcon from '@betnomi/libs/assets/img/icons/popular.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { usePagination } from 'hooks/usePagination';
import { Loading } from '@betnomi/libs/components/Loading';
import { gameProvidersBreakpoints, getGames } from '../../containers/homepage/Games';
import { getBanners } from './bannerData';
import { useShallowSelector } from '../../hooks';
import {
  selectAssets,
  selectGamesForSearch,
  selectHomeGames,
  selectProviders,
} from '../../store/home/selectors';
import { selectAuthUI } from '../../store/auth/selectors';
import { SearchPanel } from './Content/SearchPanel';
import { LoadMore } from './Content/LoadMore';
import { useTranslation } from '../../i18n';
import { optionsSportBetResult, requestParams } from './casinoPageProviders';

import { selectIsMobile } from '../../store/global/selectors';

import { FilterGameType, FilterOperators } from '../../constants/filters';
import {
  homeGetGames,
  homeSetGames,
  getGamesForSearch,
  getGameProviders,
} from '../../store/home/actionCreators';
import { ImgIx } from '../../components/common/Imgix';
import { getProviders } from '../../utils/providers';
import styles from './styles.module.scss';

interface IProps {}

const Casino: FC<IProps> = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { isLoading, casinoData } = useShallowSelector(selectHomeGames);
  const { assetList, isLoadingAsset } = useShallowSelector(selectAssets);
  const { searchGames } = useShallowSelector(selectGamesForSearch);
  const { list: providersState } = useShallowSelector(selectProviders);
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const { state }: any = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gridRef = useRef<HTMLDivElement | null>(null);

  const bigScreen = window.matchMedia('(min-width:1700px)').matches;
  const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1200px)').matches;
  const midScreen = window.matchMedia('(min-width:1201px) and (max-width: 1500px)').matches;
  const gameImgSizes = {
    gameProviders: {
      width: midScreen && isChatActive ? 125 : midScreen ? 135 : isChatActive ? 140 : 145,
      height: midScreen && isChatActive ? 60 : midScreen ? 70 : isChatActive ? 65 : 75,
    },
  };

  const history = useHistory();
  const handlePlayGame = (game: any) => {
    if (!game.game_id) return;

    history.push({
      pathname: `/casino/${game.game_id}`,
      state: { game, from: 'games' },
    });
  };

  const [providers, setProviders] = useState<string[]>(['All']);

  const isProvider = !isEmpty(state) && state?.game?.provider;
  useEffect(() => {
    if (isProvider) {
      setProviders([state.game.provider]);
      window.scrollTo(0, 0);
    }
    return () => {
      dispatch(homeSetGames({
        casinoData: {
          list: [],
          meta: {
            filter_count: 0,
          },
        },
      }));
      history.push({
        state: {},
      });
    };
  }, [isProvider]);

  useEffect(() => {
    const filterData = `filter[game_id][${FilterOperators.in}]`;
    dispatch(homeGetGames({
      filterKey: filterData,
      params: '16318,40016795,3300892',
      filterGameType: FilterGameType.gameBanner,
    }));
  }, []);

  const getCasinoGames = (limit: number, offset: number) => {
    const filterData = `filter[provider_title][${FilterOperators.in}]`;

    dispatch(homeGetGames({
      filterKey: filterData,
      published: 'published',
      params: isProvider ? state?.game.provider : providers.length
        ? providers.indexOf('All') !== -1
          ? requestParams
          : providers.join(',')
        : requestParams,
      meta: 'filter_count',
      limit,
      offset,
      filterGameType: FilterGameType.casino,
    }));
  };

  const handleSelectedProviders = (selectedProviders: string[]) => {
    history.push({
      state: {},
    });

    const index = selectedProviders.indexOf('All');
    if (index > -1) {
      selectedProviders.splice(index, 1);
    }

    setProviders(selectedProviders);
    dispatch(homeSetGames({
      casinoData: {
        list: [],
        meta: {
          filter_count: 0,
        },
      },
    }));
  };

  const handleSearch = (value: string) => {
    const filterData = `filter[name][${FilterOperators.contains}]`;

    dispatch(getGamesForSearch({
      published: 'published',
      filterSearchProvider: requestParams,
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
    let CMSProviders = [];
    CMSProviders = optionsSportBetResult.filter((item) => item.value !== 'All').map((obj: any) => {
      const index = providersState.findIndex((el: any) => el.provider_title === obj.value);
      const count = index !== -1 && providersState[index].count.id;
      return {
        ...obj,
        games: count,
      };
    });

    let allCount = 0;
    /* eslint-disable-next-line */
    for (let prop in CMSProviders) {
      allCount += CMSProviders[prop].games;
    }

    return [{ label: 'All', games: allCount, value: 'All' }, ...CMSProviders];
  }, [providersState]);

  const getBannerList = useMemo(() => assetList
    .filter((filter) => getBanners
      .find(({ id }) => filter.id === id)).map((item) => ({
      id: item.id,
      image: item.asset,
      game_id: getBanners.find(({ id }) => item.id === id)?.game_id,
    })), [assetList]);

  const { visibleSource, handleLoadMore } = usePagination(casinoData.list, gridRef, getCasinoGames, isLoading, true, 150);

  return (
    <div className={styles.page}>
      <div className={styles.banners}>
        {
          !isLoadingAsset
            ? (
              <BannerList
                items={isMobile ? 1 : isChatActive ? bigScreen ? 4 : 3 : 4}
                banners={getBannerList}
                withPagination
              />
            )
            : (
              <div className={styles.loading}>
                <Loading />
              </div>
            )
        }
      </div>
      <SearchPanel
        onChangeSearch={handleSearch}
        optionsSportBetResult={getOptionsSportBetResult}
        selectedOptions={providers}
        serchData={searchGames.list}
        thumbnailWidth={45}
        onSelectedProviderChange={handleSelectedProviders}
        onSelectSearch={handlePlayGame}
      />
      <div className={styles.list}>
        <div ref={gridRef} className={cx(styles.mustPlayList)}>
          {
              visibleSource.length ? (
                <>
                  <div className={cx(styles.listItemBanner, styles.bigBanner)}>
                    <p className={styles.popularIcon}><img src={popularIcon} alt="popular games icon" /></p>
                    <div>
                      <p className={styles.playOver}>
                        {t('Play over')}
                        <span className={styles.games}> 1000 games </span>
                        {t('from the best providers')}
                      </p>
                      <FontIcon name={FontIconName.ArrowRightBold} size={24} />
                    </div>
                  </div>
                  {visibleSource.map((item) => (
                    <>
                      <div className={cx(styles.listItem, { [styles.noImage]: !item.thumbnail })} key={`game${item.id}`}>
                        <ImgIx src={item.thumbnail ?? 'default'} className={styles.img} width={168} />
                        <GameOverlay handlePlayGame={() => handlePlayGame(item)} className={styles.overlay} />
                      </div>
                    </>
                  ))}
                </>
              ) : null
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

      { visibleSource.length ? <LoadMore totalItemsCount={casinoData.meta.filter_count} isLoading={isLoading} loadedItemsCount={visibleSource.length} loadMoreHandler={handleLoadMore} /> : null}

      <div className={cx(styles.list, styles.addMargin)}>
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

export default Casino;
