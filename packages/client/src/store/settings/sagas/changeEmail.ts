import { call, put } from '@redux-saga/core/effects';
import { authSetUser } from 'store/auth/actionCreators';
import { BackendErrorResponse } from 'types/api';
import { ChangeEmailAction, changeEmailResponse } from '../actionCreators';
import { changeEmail } from '../api';

export function* changeEmailSaga(action: ChangeEmailAction) {
  try {
    yield call(changeEmail, action.data);
    yield put(changeEmailResponse());
    yield put(
      authSetUser({
        email: action.data.newEmail,
      }),
    );
  } catch (error) {
    yield put(changeEmailResponse((error as any).response.data as BackendErrorResponse));
  }
}
