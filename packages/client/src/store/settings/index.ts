import { CoinType } from '@betnomi/libs/types';
import createReducer from '@betnomi/libs/utils/createReducer';
import { SettingsState } from 'types/store/settings';
import { settingsHandlers } from './handlers';

const cryptoCurrencies = {
  [CoinType.bitcoin]: true,
  [CoinType.ethereum]: true,
  [CoinType.sbni]: true,
  [CoinType.litecoin]: true,
  [CoinType.tether]: true,
  [CoinType.ripple]: true,
  [CoinType.tron]: true,
  [CoinType.doge]: true,
  [CoinType.binancecoin]: true,
  [CoinType.bitcoincash]: true,
};

export const settingsInitialState: SettingsState = {
  viewInFiatCurrency: true,
  cryptoCurrencies,
  changePassword: { isLoading: false, error: undefined },
  changeEmail: { isLoading: false, error: undefined },
  twoFA: {
    isLoading: true, isEnabled: false, qrCodeSecret: '', qrCodeUri: '', error: undefined,
  },
  privacy: {
    isUsernameHidden: false,
  },
};

export default createReducer(settingsInitialState, settingsHandlers);
