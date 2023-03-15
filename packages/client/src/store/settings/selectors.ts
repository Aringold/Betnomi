import { State } from 'types/store';

export const selectViewInFiatCurrency = (state: State) => state.settings.viewInFiatCurrency;
export const selectCryptoCurrencies = (state: State) => state.settings.cryptoCurrencies;
export const selectChangePassword = (state: State) => state.settings.changePassword;
export const selectChangeEmail = (state: State) => state.settings.changeEmail;
export const select2FA = (state: State) => state.settings.twoFA;
export const selectPrivacy = (state: State) => state.settings.privacy;
