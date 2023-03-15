import { takeLeading } from 'redux-saga/effects';
import { GamesActionType } from '../actionTypes';
import { fetchCMSGames } from './fetchCMS';

export default function* gamesSaga() {
  yield takeLeading(GamesActionType.GetGames, fetchCMSGames);
}
