import { takeLeading } from '@redux-saga/core/effects';
import { SettingsActionTypes } from 'store/settings/actionTypes';
import { changeEmailSaga } from './changeEmail';
import { changePasswordSaga } from './changePassword';
import { get2FASaga } from './get2FA';
import { set2FAActivateSaga } from './set2FAActivate';
import { set2FADeactivateSaga } from './set2FADeactivate';

export default function* settingsSaga() {
  yield takeLeading(SettingsActionTypes.ChangePassword, changePasswordSaga);
  yield takeLeading(SettingsActionTypes.ChangeEmail, changeEmailSaga);
  yield takeLeading(SettingsActionTypes.Get2FA, get2FASaga);
  yield takeLeading(SettingsActionTypes.Set2FAActivate, set2FAActivateSaga);
  yield takeLeading(SettingsActionTypes.set2FADeactivate, set2FADeactivateSaga);
}
