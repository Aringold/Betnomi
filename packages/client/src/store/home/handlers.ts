import { ActionFn } from '@betnomi/libs/types/redux';
import { assocPath } from 'ramda';
import { HomeState } from '../../types/store/home';
import {
  BannersFetchedAction,
  homeSetGames,
  setGamesForSearch,
  setGameProviders,
} from './actionCreators';
import { HomeActionType } from './actionTypes';

type HomeHandlerFn<F extends (...args: any[]) => any> = ActionFn<HomeState, ReturnType<F>>;

const setGames: HomeHandlerFn<typeof homeSetGames> = (
  state,
  { payload },
) => assocPath(['games'], { ...state.games, ...payload }, state);

const setSearchGames: HomeHandlerFn<typeof setGamesForSearch> = (
  state,
  { payload },
) => assocPath(['searchGames'], { ...state.searchGames, ...payload }, state);

const setProvidersGame: HomeHandlerFn<typeof setGameProviders> = (
  state,
  { payload },
) => assocPath(['providers'], { ...state.providers, ...payload }, state);

const setRecommendationsGames: HomeHandlerFn<typeof setGameProviders> = (
  state,
  { payload },
) => assocPath(['recommendationsGames'], { ...state.recommendationsGames, ...payload }, state);

const setAssets: HomeHandlerFn<typeof setGameProviders> = (
  state,
  { payload },
) => assocPath(['assets'], { ...state.assets, ...payload }, state);

const bannersFetched = (state: HomeState, action: BannersFetchedAction) => ({
  ...state,
  banners: action.banners,
});

export const homeHandlers = {
  [HomeActionType.SetGames]: setGames,
  [HomeActionType.setGamesForSearch]: setSearchGames,
  [HomeActionType.BannersFetched]: bannersFetched,
  [HomeActionType.SetProviders]: setProvidersGame,
  [HomeActionType.SetRecommendationsGames]: setRecommendationsGames,
  [HomeActionType.SetAssets]: setAssets,
};
