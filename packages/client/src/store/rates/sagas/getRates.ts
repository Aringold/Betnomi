import {
  call, delay, put, select, take,
} from 'redux-saga/effects';
import { coinOrder } from '@betnomi/libs/types';
import { AxiosResponse } from 'axios';
import { ratesSetFormUSD, ratesSetRates, ratesSetState } from '../actionCreators';
import { ratesGetRate } from '../api';
import { Unwrap } from '../../../types/unwrap';
import { RatesGetRateResponse } from '../types';
import { AuthActionTypes } from '../../auth/actionsTypes';
import { selectAuth } from '../../auth/selectors';
import { authSetTokens } from '../../auth/actionCreators';

const refreshDelay = 60 * 10 * 1000;
const errorDelay = 5 * 1000;

export const getRates = async (quoteCurrency: string) => {
  const coins = coinOrder.join();

  const result = await ratesGetRate(coins, quoteCurrency).request.catch(
    () => ({ data: { rates: [{ rate: 0, baseCurrency: '', quoteCurrency: '' }] } } as AxiosResponse<RatesGetRateResponse>),
  );

  return result.data.rates.reduce((acc, nV) => (nV.rate !== 0 ? { ...acc, [nV.baseCurrency]: +[nV.rate] } : acc), {});
};

export function* getRatesAndSetState() {
  const { user }: ReturnType<typeof selectAuth> = yield select(selectAuth);
  if (user.bcCurrency.length === 0 || user.bcCurrency === 'UNKNOWN') {
    return;
  }
  const rates: Unwrap<typeof getRates> = yield call(getRates, user.bcCurrency);

  yield put(ratesSetRates(rates));
  yield put(
    ratesSetState({
      lastLoadedAt: new Date(),
    }),
  );
}

export function* getRatesFormUSD() {
  const { user }: ReturnType<typeof selectAuth> = yield select(selectAuth);
  if (user.bcCurrency.length === 0 || user.bcCurrency === 'UNKNOWN') {
    return;
  }

  const rates: Unwrap<typeof getRates> = yield call(getRates, 'USD');
  yield put(ratesSetFormUSD(rates));
}

export function* getRatesSaga() {
  // wait for tokens to be rehydrated
  yield take(AuthActionTypes.Ready);

  // TODO: remove this, when rates become available for guests
  const { access, refresh }: ReturnType<typeof selectAuth> = yield select(selectAuth);
  if (!access || !refresh) {
    yield take(authSetTokens);
  }

  while (true) {
    try {
      yield delay(refreshDelay);
      yield getRatesAndSetState();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      yield delay(errorDelay);
    }
  }
}
