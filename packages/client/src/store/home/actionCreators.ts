import { Action } from 'redux';
import { Banner, CMSRequest, HomeState } from '../../types/store/home';
import { HomeActionType } from './actionTypes';

export const homeGetGames = (payload: CMSRequest) => ({
  type: HomeActionType.GetGames,
  payload,
});

export const homeSetGames = (payload: Partial<HomeState['games']>) => ({
  type: HomeActionType.SetGames,
  payload,
});

export const setGamesForSearch = (payload: Partial<HomeState['searchGames']>) => ({
  type: HomeActionType.setGamesForSearch,
  payload,
});

export const getGameProviders = (payload: CMSRequest) => ({
  type: HomeActionType.GetProviders,
  payload,
});

export const setGameProviders = (payload: Partial<HomeState['providers']>) => ({
  type: HomeActionType.SetProviders,
  payload,
});

export const getGamesForSearch = (payload: CMSRequest) => ({
  type: HomeActionType.getGamesForSearch,
  payload,
});

export const fetchBanners = () => ({
  type: HomeActionType.FetchBanners,
});

export interface BannersFetchedAction extends Action {
  banners: Banner[];
}
export const bannersFetched = (banners: Banner[]):BannersFetchedAction => ({
  type: HomeActionType.BannersFetched,
  banners,
});

export const serRecommendationsGames = (payload: Partial<HomeState['recommendationsGames']>) => ({
  type: HomeActionType.SetRecommendationsGames,
  payload,
});

export const getRecommendationsGames = (payload: CMSRequest) => ({
  type: HomeActionType.GetRecommendationsGames,
  payload,
});

export const getGameAssets = (payload: CMSRequest) => ({
  type: HomeActionType.GetAssets,
  payload,
});

export const setGameAssets = (payload: Partial<HomeState['assets']>) => ({
  type: HomeActionType.SetAssets,
  payload,
});
