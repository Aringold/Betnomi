import { call, put, select } from 'redux-saga/effects';
import { showErrorToast } from '@betnomi/libs/components/Toaster';
import { CoinType } from '@betnomi/libs/types';
import { authLogout, authSetTokens, setGameToken } from '../actionCreators';
import { authRefresh, authCurencyChange } from '../api';
import { selectAuth } from '../selectors';
import { Unwrap } from '../../../types/unwrap';
import { transformBackendErrorToString } from '../../../utils/api/transforms';

export function* changeCurencySaga(currency: CoinType) {
  const {
    refresh: token,
  }: ReturnType<typeof selectAuth> = yield select(selectAuth);

  const {
    data,
  }: Unwrap<typeof authRefresh> = yield call(authCurencyChange, token, currency);

  yield put(setGameToken({ GameToken: data.token, ExpiresAt: Number(data.expiresAt) }));
}

export function* authRefreshCallSaga() {
  const {
    refresh: token,
    currency,
  }: ReturnType<typeof selectAuth> = yield select(selectAuth);

  const {
    data: { access, refresh, game },
  }: Unwrap<typeof authRefresh> = yield call(authRefresh, token, currency);

  yield put(authSetTokens(access, refresh, game));
}

export function* authOnRefreshSaga() {
  try {
    yield call(authRefreshCallSaga);
  } catch (e) {
    showErrorToast(transformBackendErrorToString(e));
    yield put(authLogout());
  }
}
