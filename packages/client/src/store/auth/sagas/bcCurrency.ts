import { call, put } from '@redux-saga/core/effects';
import { getRatesAndSetState } from 'store/rates/sagas/getRates';
import { authSetUser, setBcCurrency } from '../actionCreators';
import { setBcCurrency as setBcCurrencyApi } from '../api';

export function* setBcCurrencySaga({
  payload: { bcCurrency },
}: ReturnType<typeof setBcCurrency>) {
  try {
    yield call(setBcCurrencyApi, bcCurrency);
    yield put(authSetUser({ bcCurrency }));
    yield getRatesAndSetState();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}
