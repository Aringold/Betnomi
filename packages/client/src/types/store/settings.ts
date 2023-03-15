import { BackendErrorResponse } from 'types/api';

export type CryptoCurrencies = { [key: string]: boolean };

interface ChangePassword {
  isLoading: boolean;
  error: BackendErrorResponse | undefined,
}

interface ChangeEmail {
  isLoading: boolean,
  error: BackendErrorResponse | undefined,
}

interface TwoFA {
  isLoading: boolean,
  isEnabled: boolean,
  qrCodeSecret: string,
  qrCodeUri: string,
  error: BackendErrorResponse | undefined,
}

export interface PrivacySettings {
  isUsernameHidden: boolean;
}

export interface SettingsState {
  viewInFiatCurrency: boolean;
  cryptoCurrencies: CryptoCurrencies;
  changePassword: ChangePassword;
  changeEmail: ChangeEmail;
  twoFA: TwoFA;
  privacy: PrivacySettings;
}
