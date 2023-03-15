/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';
import { getNewGameToken } from '../api';
import { Unwrap } from '../../../types/unwrap';
import { setGameToken } from '../actionCreators';

export function* gameToken() {
  try {
    const { data }: Unwrap<typeof setGameToken> = yield call(getNewGameToken);
    yield put(setGameToken(data.GameToken));
  } catch (e) {
    console.warn(e);
    // TODO: handle it
  }
}
