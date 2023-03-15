import { GamesState } from '../../types/store/games';
import { GamesActionType } from './actionTypes';
import { SetGamesAction } from './actionCreators';
import { Game } from './types';

const setGames = (state: GamesState, action: SetGamesAction) => {
  const upcomigGames: Game[] = [];
  const response = action.payload;

  for (let i = 0; i < response.length; i += 1) {
    if (state.list.find((game) => game.game_id === response[i].game_id) === undefined) { upcomigGames.push(response[i]); }
  }

  return { ...state, list: [...state.list, ...upcomigGames] };
};

export const gamesHandlers = {
  [GamesActionType.SetGames]: setGames,
};
