import { all, call, put } from '@redux-saga/core/effects';
import { BackendErrorResponse } from 'types/api';
import { set2FA, set2FAError } from '../actionCreators';
import { get2FA } from '../api';
import { Unwrap } from '../../../types/unwrap';

export function* get2FASaga() {
  try {
    const [{ data }]: [
      Unwrap<typeof get2FA>,
    ] = yield all([
      call(get2FA),
    ]);
    yield put(set2FA(data));
  } catch (error) {
    yield put(set2FAError((error as any).response.data as BackendErrorResponse));
  }
}
