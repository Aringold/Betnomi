import { takeLeading, takeEvery } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/es/constants';
import { HomeActionType } from '../actionTypes';
import {
  fetchCMSHome,
  fetchCMSHomeBanners,
  fetchCMSSearch,
  fetchCMSGameProviders,
  fetchCMSRecommendationsGames,
  fetchCMSAssets,
} from './fetchCMS';

export default function* HomeSaga() {
  yield takeEvery(HomeActionType.GetGames, fetchCMSHome);
  yield takeLeading(HomeActionType.FetchBanners, fetchCMSHomeBanners);
  yield takeEvery(HomeActionType.getGamesForSearch, fetchCMSSearch);
  yield takeLeading(HomeActionType.GetProviders, fetchCMSGameProviders);
  yield takeLeading(HomeActionType.GetRecommendationsGames, fetchCMSRecommendationsGames);
  yield takeLeading(REHYDRATE, fetchCMSAssets);
}
