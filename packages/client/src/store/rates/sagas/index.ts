import { fork, takeLeading } from 'redux-saga/effects';
import { getRatesFormUSD, getRatesSaga } from './getRates';
import { RatesActionTypes } from '../actionTypes';

export function* ratesSaga() {
  yield fork(getRatesSaga);
  yield takeLeading(RatesActionTypes.GetRateFromUSD, getRatesFormUSD);
}
