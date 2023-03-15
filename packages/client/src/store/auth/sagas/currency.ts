import { call, put } from 'redux-saga/effects';
import { showErrorToast } from '@betnomi/libs/components/Toaster';
import { authSelectCurrency, authSetState } from '../actionCreators';
import { changeCurencySaga } from './refresh';
import { transformBackendErrorToString } from '../../../utils/api/transforms';

export function* authSelectCurrencySaga({
  payload: { currency },
}: ReturnType<typeof authSelectCurrency>) {
  try {
    yield call(changeCurencySaga, currency);
    yield put(
      authSetState({
        currency,
      }),
    );
  } catch (e) {
    showErrorToast(transformBackendErrorToString(e));
    yield put(authSetState({ currency }));
  }
}
