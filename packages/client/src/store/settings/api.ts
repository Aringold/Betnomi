import { api } from 'utils/api';
import { ApiPaths } from 'utils/api/constants';
import {
  ChangeEmailData, ChangePasswordData, Set2FAActivateData, Set2FADeactivateData, 
} from './actionCreators';

export const get2FA = () =>
  api.get(ApiPaths.TWOFA);

export const set2FAActivate = (data: Set2FAActivateData) =>
  api.post(ApiPaths.TWOFAACTIVATE, data);

export const set2FADeactivate = (data: Set2FADeactivateData) =>
  api.post(ApiPaths.TWOFADEACTIVATE, data);

export const changePassword = (data: ChangePasswordData) => 
  api.post(ApiPaths.ChangePassword, data);

export const changeEmail = (data: ChangeEmailData) => 
  api.post(ApiPaths.ChangeEmail, data);
