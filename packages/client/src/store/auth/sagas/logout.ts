import { disconnectCentrifuge } from '@betnomi/libs/store/net/centrifuge';
import { CentrifugeSuffixes } from 'constants/centrifuge';
import { put } from 'redux-saga/effects';
import { authSetTokens, authSetUser } from '../actionCreators';
import { authInitialState } from '../index';

export function* authLogoutSaga() {
  yield put(disconnectCentrifuge(CentrifugeSuffixes.Chat));
  yield put(authSetTokens('', '', ''));
  yield put(authSetUser(authInitialState.user));
}
