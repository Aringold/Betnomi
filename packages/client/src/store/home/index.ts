import createReducer from '@betnomi/libs/utils/createReducer';
import { HomeState } from '../../types/store/home';
import { homeHandlers } from './handlers';

const initialState: HomeState = {
  games: {
    isLoading: false,
    categories: [],
    trending: [],
    slots: [],
    promotions: [],
    liveCasino: [],
    gameProviders: [],
    casinoData: {
      list: [],
      meta: {
        filter_count: 0,
      },
    },
    liveCasinoData: {
      list: [],
      meta: {
        filter_count: 0,
      },
    },
    game: [],
    gamesPage: {
      list: [],
      meta: {
        filter_count: 0,
      },
    },
    banner: {
      list: [],
    },
  },
  searchGames: {
    list: [],
    isLoading: false,
  },
  banners: [],
  providers: {
    list: [],
  },
  recommendationsGames: [],
  assets: {
    isLoadingAsset: false,
    assetList: [],
  },
};

export default createReducer(initialState, homeHandlers);
