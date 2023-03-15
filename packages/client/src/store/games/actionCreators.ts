import { Action } from 'redux';
import { CMSRequest } from '../../types/store/games';
import { Game } from './types';
import { GamesActionType } from './actionTypes';

export interface GetGamesData extends CMSRequest{ }

export interface GetGamesAction extends Action {
  payload: GetGamesData
}

export interface SetGamesAction extends Action {
  payload: Game[]
}

export const getGames = (payload: GetGamesData): GetGamesAction => ({
  type: GamesActionType.GetGames,
  payload,
});

export const setGames = (payload: Game[]): SetGamesAction => ({
  type: GamesActionType.SetGames,
  payload,
});
