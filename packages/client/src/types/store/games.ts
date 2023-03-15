import { Game } from '../../store/games/types';

export interface GamesState {
  isLoading: boolean,
  list: Game[]
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
