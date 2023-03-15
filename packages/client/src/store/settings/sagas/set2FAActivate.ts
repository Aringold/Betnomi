import { all, call, put } from '@redux-saga/core/effects';
import { BackendErrorResponse } from 'types/api';
import { set2FAActivateResponce, Set2FAActivateAction, set2FAActivateError } from '../actionCreators';
import { set2FAActivate } from '../api';
import { Unwrap } from '../../../types/unwrap';

export function* set2FAActivateSaga(action: Set2FAActivateAction) {
  try {
    const [{ data }]: [
      Unwrap<typeof set2FAActivate>,
    ] = yield all([
      call(set2FAActivate, action.data),
    ]);
    yield put(set2FAActivateResponce(data));
  } catch (error) {
    yield put(set2FAActivateError((error as any).response.data as BackendErrorResponse));
  }
}
