import { all, call, put } from '@redux-saga/core/effects';
// import { BackendErrorResponse } from 'types/api';
import { getBonuses } from '../api';
import { setBonusesResponse } from '../actionCreators';
import { Unwrap } from '../../../types/unwrap';

export function* getBonusesSaga() {
  try {
    const [{ data }]: [
      Unwrap<typeof getBonuses>,
    ] = yield all([
      call(getBonuses),
    ]);
    yield put(setBonusesResponse(data));
  } catch (error) {
    // yield put(set2FAError((error as any).response.data as BackendErrorResponse));
  }
}
