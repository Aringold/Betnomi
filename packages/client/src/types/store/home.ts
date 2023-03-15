import { GameCategory } from '@betnomi/libs/constants/gameCategory';
import {
  Game,
  SearchData,
  Provider,
  AssetsResponse,
} from '../../store/home/types';

export interface Banner {
  id: string;
  banner: string;
}

export interface HomeState {
  games: {
    isLoading: boolean;
    categories: GameCategory[];
    trending: Game[];
    slots: Game[];
    promotions: Game[];
    liveCasino: Game[];
    casinoData: {
      list: Game[],
      meta: {
        filter_count: number,
      },
    };
    liveCasinoData: {
      list: Game[],
      meta: {
        filter_count: number,
      },
    };
    game: Game[],
    banner: {
      list: Game[],
    },
    gamesPage: {
      list: Game[],
      meta: {
        filter_count: number,
      },
    },
    gameProviders: Game[];
  },
  searchGames: {
    isLoading: boolean,
    list: SearchData[],
  }
  banners: Banner[],
  providers: {
    list: Provider[],
  },
  recommendationsGames: Game[],
  assets: {
    isLoadingAsset: boolean,
    assetList: AssetsResponse[],
  },
}

export type CMSRequest = {
  filterKey: string;
  filterSearchProvider?: string;
  aggregate?: string;
  params?: string;
  published?: string;
  groupBy?: string;
  meta?: string;
  limit?: number;
  offset?: number;
  filterGameType?: string;
};
