import { Action } from 'redux';
import { BackendErrorResponse } from 'types/api';
import { PrivacySettings } from 'types/store/settings';
import { SettingsActionTypes } from './actionTypes';

export interface SetViewInFiatCurrencyAction extends Action {
  isView: boolean;
}

export interface SetCryptoCurrenciesAction extends Action {
  name: string,
  isActive: boolean,
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ChangeEmailData {
  newEmail: string;
  newEmailConfirm: string;
}

export interface Get2FAData {
  qrCodeUri: string;
  qrCodeSecret: string;
}

export interface Set2FAActivateData {
  secret: string;
  password: string;
  verificationCode: string;
}

export interface Set2FADeactivateData {
  password: string;
  verificationCode: string
}
export interface Set2FAActivateReponseData {
  ok: boolean;
  err: string;
}

export interface Set2FADeactivateReponseData {
  ok: boolean;
  err: string;
}

export interface ChangePasswordAction extends Action {
  data: ChangePasswordData
}
export interface Set2FAAction extends Action {
  data: Get2FAData
}

export interface Set2FAErrorAction extends Action {
  error?: BackendErrorResponse
}

export interface Set2FAActivateAction extends Action {
  data: Set2FAActivateData
}

export interface Set2FAActivateErrorAction extends Action {
  error?: BackendErrorResponse
}

export interface Set2FADeactivateAction extends Action {
  data: Set2FADeactivateData
}

export interface Set2FADeactivateErrorAction extends Action {
  error?: BackendErrorResponse
}

export interface Set2FAActivateResponseAction extends Action {
  data: Set2FAActivateReponseData
}

export interface Set2FADeactivateResponseAction extends Action {
  data: Set2FAActivateReponseData
}

export interface ChangePasswordResponseAction extends Action {
  error?: BackendErrorResponse
}

export interface ChangeEmailAction extends Action {
  data: ChangeEmailData
}

export interface ChangeEmailResponseAction extends Action {
  error?: BackendErrorResponse
}

export interface SetPrivacyAction extends Action {
  privacy: PrivacySettings;
}

export const setViewInFiatCurrency = (isView: boolean):SetViewInFiatCurrencyAction => ({
  type: SettingsActionTypes.SetViewInFiatCurrency,
  isView,
});

export const setCryptoCurrency = (name: string, isActive: boolean):SetCryptoCurrenciesAction => ({
  type: SettingsActionTypes.SetCryptoCurrency,
  name,
  isActive,
});

export const changePassword = (data: ChangePasswordData):ChangePasswordAction => ({
  type: SettingsActionTypes.ChangePassword,
  data,
});

export const changePasswordResponse = (error?: BackendErrorResponse):ChangePasswordResponseAction => ({
  type: SettingsActionTypes.ChangePasswordResponse,
  error,
});

export const changeEmail = (data: ChangeEmailData): ChangeEmailAction => ({
  type: SettingsActionTypes.ChangeEmail,
  data,
});

export const changeEmailResponse = (error?: BackendErrorResponse): ChangeEmailResponseAction => ({
  type: SettingsActionTypes.ChangeEmailResponse,
  error,
});

export const get2FA = (): Action => ({
  type: SettingsActionTypes.Get2FA,
});

export const set2FA = (data: Get2FAData): Set2FAAction => ({
  type: SettingsActionTypes.Set2FA,
  data,
});

export const set2FAError = (error?: BackendErrorResponse): Set2FAErrorAction => ({
  type: SettingsActionTypes.Set2FAError,
  error,
});

export const set2FAActivate = (data: Set2FAActivateData): Set2FAActivateAction => ({
  type: SettingsActionTypes.Set2FAActivate,
  data,
});

export const set2FAActivateError = (error?: BackendErrorResponse): Set2FAActivateErrorAction => ({
  type: SettingsActionTypes.Set2FAActivateError,
  error,
});

export const set2FAActivateResponce = (data: Set2FAActivateReponseData): Set2FAActivateResponseAction => ({
  type: SettingsActionTypes.set2FAActivateResponce,
  data,
});

export const set2FADeactivate = (data: Set2FADeactivateData): Set2FADeactivateAction => ({
  type: SettingsActionTypes.set2FADeactivate,
  data,
});

export const set2FADeactivateError = (error: BackendErrorResponse): Set2FADeactivateErrorAction => ({
  type: SettingsActionTypes.set2FADeactivateError,
  error,
});

export const set2FADeactivateResponce = (data: Set2FADeactivateReponseData): Set2FADeactivateResponseAction => ({
  type: SettingsActionTypes.set2FADeactivateResponce,
  data,
});

export const setPrivacy = (privacy:PrivacySettings):SetPrivacyAction => ({ type: SettingsActionTypes.SetPrivacy, privacy });
