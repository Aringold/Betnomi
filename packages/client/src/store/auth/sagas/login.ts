/* eslint-disable no-console */
import { all, call, put } from 'redux-saga/effects';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { CoinType } from '@betnomi/libs/types';
import { values } from 'ramda';
import { modalHide } from 'store/modal/actionCreators';
import { getRatesAndSetState } from 'store/rates/sagas/getRates';
import {
  authLogin,
  authLogout,
  authSetLogin,
  authSetRanks,
  authSetState,
  authSetTokens,
  authSetUser,
} from '../actionCreators';
import {
  authGetBalances, authGetMe, authGetMyAffiliates, authPostLogin, 
} from '../api';
import { Unwrap } from '../../../types/unwrap';
import { getDeviceName, getDeviceUUID } from '../../../utils/api/device_uuid';
import {
  affiliateResponseToStatus,
  signInErrorResponseToError,
  transformBalanceToFloat,
} from '../../../utils/api/transforms';

export function* authFetchBalances() {
  const balances = values(CoinType).reduce(
    (acc, coin) => ({ ...acc, [coin]: 0 }),
    {} as Record<CoinType, number>,
  );

  try {
    const { data }: Unwrap<typeof authGetBalances> = yield call(
      authGetBalances,
    );

    data.list.forEach((item) => {
      balances[item.currency] = transformBalanceToFloat(item.balance);
    });
  } catch (e) {
    // TODO: handle error (if needed)
  }

  return balances;
}

export function* authFetchUserSaga() {
  try {
    const [{ data: meData }, { data: affiliateData }, balances]: [
      Unwrap<typeof authGetMe>,
      Unwrap<typeof authGetMyAffiliates>,
      Unwrap<typeof authFetchBalances>,
    ] = yield all([
      call(authGetMe),
      call(authGetMyAffiliates),
      call(authFetchBalances),
    ]);
    yield put(
      authSetUser({
        image: meData.image,
        name: meData.login,
        level: PlayerLevel.Legend,
        progress: 75,
        confirmed: meData.isEmailVerified,
        balances,
        id: parseInt(meData.userId, 10),
        bcCurrency: meData.bcCurrency,
        email: meData.email,
        intercomHash: meData.intercomHash,
      }),
    );

    yield put(authSetRanks({ my: affiliateResponseToStatus(affiliateData) }));
    yield getRatesAndSetState();
  } catch (e) {
    console.log(e);
  }
}

export function* authSetTokensAndFetchUserDataSaga({
  access,
  refresh,
  game,
  playCurrency: currency,
}: {
  access: string;
  refresh: string;
  game: any;
  playCurrency: CoinType;
}) {
  yield put(
    authSetState({
      currency,
      access,
      refresh,
    }),
  );
  yield call(authFetchUserSaga);
  yield put(authSetTokens(access, refresh, game));
}

export function* authLoginCallSaga(username: string, password: string) {
  const deviceId = getDeviceUUID();
  const deviceName = getDeviceName();
  const {
    data,
  }: Unwrap<typeof authPostLogin> = yield call(
    authPostLogin,
    username,
    password,
    deviceId,
    deviceName,
  );
  yield put(modalHide());
  yield call(authSetTokensAndFetchUserDataSaga, data);
}

export function* authLoginSaga({
  payload: {
    values: { username, password },
    callback,
  },
}: ReturnType<typeof authLogin>) {
  try {
    yield put(authSetLogin({ isLoading: true }));
    yield call(authLoginCallSaga, username, password);
    callback();
  } catch (error) {
    yield put(authLogout({ reason: error.message }));
    yield put(authSetLogin({ error: error.message }));
    callback(signInErrorResponseToError(error.response.data));
  } finally {
    yield put(authSetLogin({ isLoading: false }));
  }
}
