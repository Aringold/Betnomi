import { call, put, select } from 'redux-saga/effects';
import { Banner } from 'types/store/home';
import { Unwrap } from '../../../types/unwrap';
import { transformBackendErrorToString } from '../../../utils/api/transforms';
import {
  getCMSAssets,
  getCMSGames,
  getCMSRecommendationsGames,
  getHomeBanners,
} from '../api';
import {
  bannersFetched,
  homeGetGames,
  homeSetGames,
  getGamesForSearch,
  setGamesForSearch,
  setGameProviders,
  getRecommendationsGames,
  serRecommendationsGames,
  getGameAssets,
  setGameAssets,
} from '../actionCreators';
import { slotsData, liveCasinoData, trendingData } from '../../../constants/homePageGames';
import { FilterGameType } from '../../../constants/filters';
import { selectHomeGames } from '../selectors';

export function* fetchCMSHome({ payload }: any) {
  try {
    const {
      casinoData,
      gamesPage,
      liveCasinoData: liveCasinoDataState,
    } = yield select(selectHomeGames);

    yield put(homeSetGames({ isLoading: true }));
    const { data }: Unwrap<typeof homeGetGames> = yield call(
      getCMSGames,
      payload,
    );

    if (payload.filterGameType === FilterGameType.homePage) {
      const getSlots = data.data.filter((item: { game_id: string; }) => slotsData.find(({ id }) => item.game_id === id));
      const getLiveCasino = data.data.filter((item: { game_id: string; }) => liveCasinoData.find(({ id }) => item.game_id === id));
      const getTrending = data.data.filter((item: { game_id: string; }) => trendingData.find(({ id }) => item.game_id === id));

      yield put(homeSetGames({
        slots: getSlots,
        trending: getTrending,
        liveCasino: getLiveCasino,
      }));
    } else if (payload.filterGameType === FilterGameType.casino) {
      yield put(homeSetGames({
        casinoData: {
          list: [...casinoData.list, ...data.data],
          meta: data.meta,
        },
      }));
    } else if (payload.filterGameType === FilterGameType.game) {
      yield put(homeSetGames({
        game: data.data[0],
      }));
    } else if (payload.filterGameType === FilterGameType.liveCasino) {
      yield put(homeSetGames({
        liveCasinoData: {
          list: [...liveCasinoDataState.list, ...data.data],
          meta: data.meta,
        },
      }));
    } else if (payload.filterGameType === FilterGameType.gameBanner) {
      yield put(homeSetGames({
        banner: {
          list: data.data,
        },
      }));
    } else if (payload.filterGameType === FilterGameType.gamesPage) {
      yield put(homeSetGames({
        gamesPage: {
          list: [...gamesPage.list, ...data.data],
          meta: data.meta,
        },
      }));
    }
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(homeSetGames({ isLoading: false }));
  }
}

export function* fetchCMSHomeBanners() {
  try {
    const { data: { data } }: { data: { data: Banner[] } } = yield call(getHomeBanners);
    yield put(bannersFetched(data));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  }
}

export function* fetchCMSGameProviders({ payload }: any) {
  try {
    const { data }: Unwrap<typeof homeGetGames> = yield call(
      getCMSGames,
      payload,
    );
    yield put(setGameProviders({
      list: data.data,
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  }
}

export function* fetchCMSSearch({ payload }: any) {
  try {
    yield put(setGamesForSearch({ isLoading: true }));

    const { data }: Unwrap<typeof getGamesForSearch> = yield call(
      getCMSGames,
      payload,
    );

    yield put(setGamesForSearch({
      list: data.data,
    }));
  } catch (e) {
    console.error(transformBackendErrorToString(e));
  } finally {
    yield put(setGamesForSearch({ isLoading: false }));
  }
}

export function* fetchCMSRecommendationsGames({ payload }: any) {
  try {
    const { data }: Unwrap<typeof getRecommendationsGames> = yield call(
      getCMSRecommendationsGames,
      payload,
    );

    yield put(serRecommendationsGames(data.data ? data.data.map((item: { games_id: any; }) => item.games_id) : []));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  }
}

export function* fetchCMSAssets() {
  try {
    yield put(setGameAssets({ isLoadingAsset: true }));

    const { data }: Unwrap<typeof getGameAssets> = yield call(
      getCMSAssets,
    );

    yield put(setGameAssets({
      assetList: data.data,
    }));
  } catch (e) {
    console.error(transformBackendErrorToString(e));
  } finally {
    yield put(setGameAssets({ isLoadingAsset: false }));
  }
}
