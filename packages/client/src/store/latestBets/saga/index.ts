import { takeLeading } from 'redux-saga/effects';
import { fetchBets } from './fetchBets';
import { LatestBetsActionTypes } from '../actionTypes';

export default function* authSaga() {
  yield takeLeading(LatestBetsActionTypes.FetchInitialBets, fetchBets);
}
