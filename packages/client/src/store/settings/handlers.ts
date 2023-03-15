import { CoinType } from '@betnomi/libs/types';
import { SettingsState } from 'types/store/settings';
import {
  ChangeEmailResponseAction, ChangePasswordResponseAction, SetCryptoCurrenciesAction, SetViewInFiatCurrencyAction, Set2FAAction, Set2FAErrorAction, Set2FAActivateResponseAction, Set2FADeactivateResponseAction, SetPrivacyAction, Set2FAActivateErrorAction, Set2FADeactivateErrorAction,
} from './actionCreators';
import { SettingsActionTypes } from './actionTypes';

const setViewInFiatCurrency = (state : SettingsState, action: SetViewInFiatCurrencyAction):SettingsState =>
  ({ ...state, viewInFiatCurrency: action.isView });

const setCryptoCurrency = (state: SettingsState, action: SetCryptoCurrenciesAction):SettingsState => {
  if (!action.isActive && Object.keys(state.cryptoCurrencies)
    .filter((currency) => state.cryptoCurrencies[currency]).length === 1) {
    return ({
      ...state,
      cryptoCurrencies: {
        ...state.cryptoCurrencies,
        [action.name]: action.isActive,
        [CoinType.bitcoin]: true, 
      }, 
    });
  }
  return ({ ...state, cryptoCurrencies: { ...state.cryptoCurrencies, [action.name]: action.isActive } });
};

const changePassword = (state: SettingsState):SettingsState =>
  ({ ...state, changePassword: { isLoading: true, error: undefined } });

const changePasswordResponse = (state: SettingsState, action: ChangePasswordResponseAction):SettingsState =>
  ({ ...state, changePassword: { isLoading: false, error: action.error } });

const changeEmail = (state: SettingsState):SettingsState => ({ ...state, changeEmail: { isLoading: true, error: undefined } });
const changeEmailResponse = (state: SettingsState, action: ChangeEmailResponseAction):SettingsState =>
  ({ ...state, changeEmail: { isLoading: false, error: action.error } });

const Set2FA = (state: SettingsState, action: Set2FAAction):SettingsState => ({
  ...state,
  twoFA: {
    isLoading: false, isEnabled: false, qrCodeSecret: action.data.qrCodeSecret, qrCodeUri: action.data.qrCodeUri, error: undefined,
  }, 
});

const Set2FAError = (state: SettingsState, action: Set2FAErrorAction):SettingsState => { 
  const { error } = action;

  if (error === undefined) return { ...state };
  switch (error.code) {
    case 6:
      return {
        ...state,
        twoFA: {
          isLoading: false, isEnabled: true, qrCodeSecret: '', qrCodeUri: '', error: undefined,
        }, 
      };
    default:
      return { ...state };
  }
};

const set2FAActivateResponce = (state: SettingsState, action: Set2FAActivateResponseAction):SettingsState => {
  if (action.data.ok) {
    return {
      ...state,
      twoFA: {
        isLoading: false, isEnabled: true, qrCodeSecret: '', qrCodeUri: '', error: undefined,
      }, 
    };  
  }
  return {
    ...state,
    twoFA: {
      ...state.twoFA,
      error: {
        code: 0,
        details: [],
        message: 'Wrong Code',
      },
    }, 
  };
};

const set2FAActivateError = (state: SettingsState, action: Set2FAActivateErrorAction):SettingsState => {
  if (action.error) {
    return {
      ...state,
      twoFA: {
        ...state.twoFA, error: action.error,
      }, 
    };  
  }
  return { ...state };
};

const set2FADeactivateError = (state: SettingsState, action: Set2FADeactivateErrorAction):SettingsState => {
  if (action.error) {
    return {
      ...state,
      twoFA: {
        ...state.twoFA, error: action.error,
      }, 
    };  
  }
  return { ...state };
};

const set2FADeactivateResponce = (state: SettingsState, action: Set2FADeactivateResponseAction):SettingsState => {
  if (action.data.ok) {
    return {
      ...state,
      twoFA: {
        isLoading: false, isEnabled: false, qrCodeSecret: '', qrCodeUri: '', error: undefined,
      }, 
    };  
  }
  return { ...state };
};

const setPrivacy = (state: SettingsState, action: SetPrivacyAction) => ({ ...state, privacy: { ...state.privacy, ...action.privacy } });
 
export const settingsHandlers = {
  [SettingsActionTypes.SetViewInFiatCurrency]: setViewInFiatCurrency,
  [SettingsActionTypes.SetCryptoCurrency]: setCryptoCurrency,
  [SettingsActionTypes.ChangePassword]: changePassword,
  [SettingsActionTypes.ChangePasswordResponse]: changePasswordResponse,
  [SettingsActionTypes.ChangeEmail]: changeEmail,
  [SettingsActionTypes.ChangeEmailResponse]: changeEmailResponse,
  [SettingsActionTypes.Set2FA]: Set2FA,
  [SettingsActionTypes.Set2FAError]: Set2FAError,
  [SettingsActionTypes.Set2FAActivateError]: set2FAActivateError,
  [SettingsActionTypes.set2FAActivateResponce]: set2FAActivateResponce,
  [SettingsActionTypes.set2FADeactivateError]: set2FADeactivateError,
  [SettingsActionTypes.set2FADeactivateResponce]: set2FADeactivateResponce,
  [SettingsActionTypes.SetPrivacy]: setPrivacy,
};
