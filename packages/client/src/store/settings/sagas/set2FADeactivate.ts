import { all, call, put } from '@redux-saga/core/effects';
import { BackendErrorResponse } from 'types/api';
import { set2FADeactivateResponce, Set2FADeactivateAction, set2FADeactivateError } from '../actionCreators';
import { set2FADeactivate } from '../api';
import { Unwrap } from '../../../types/unwrap';

export function* set2FADeactivateSaga(action: Set2FADeactivateAction) {
  try {
    const [{ data }]: [
      Unwrap<typeof set2FADeactivate>,
    ] = yield all([
      call(set2FADeactivate, action.data),
    ]);
    yield put(set2FADeactivateResponce(data));
  } catch (error) {
    yield put(set2FADeactivateError((error as any).response.data as BackendErrorResponse));
  }
}
