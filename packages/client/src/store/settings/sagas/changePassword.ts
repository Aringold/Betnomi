import { call, put } from 'redux-saga/effects';
import { BackendErrorResponse } from 'types/api';
import { ChangePasswordAction, changePasswordResponse } from '../actionCreators';
import { changePassword } from '../api';

export function* changePasswordSaga(action: ChangePasswordAction) {
  try {
    yield call(changePassword, action.data);
    yield put(changePasswordResponse());
  } catch (error) {
    yield put(changePasswordResponse((error as any).response.data as BackendErrorResponse));
  }
}
