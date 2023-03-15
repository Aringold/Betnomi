import { State } from '../../types/store';

export const selectGamesIsLoading = (state: State) => state.games.isLoading;
export const selectGamesList = (state: State) => state.games.list;
