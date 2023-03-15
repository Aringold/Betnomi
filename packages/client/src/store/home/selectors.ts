import { State } from '../../types/store';

export const selectHomeGames = (state: State) => state.home.games;
export const selectHomeBanners = (state: State) => state.home.banners;
export const selectProviders = (state: State) => state.home.providers;
export const selectRecommendationsGames = (state: State) => state.home.recommendationsGames;
export const selectGamesForSearch = (state: State) => state.home;
export const selectAssets = (state: State) => state.home.assets;
