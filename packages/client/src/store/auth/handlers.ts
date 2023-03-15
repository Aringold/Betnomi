import { ActionFn } from '@betnomi/libs/types/redux';
import { assocPath } from 'ramda';
import { AuthState } from '../../types/store/auth';
import {
  authSetLogin,
  authSetRanks,
  authSetSignUp,
  authSetState,
  authSetTelegram,
  authSetUI,
  authSetUser,
  setGameToken,
  setBalance,
  setGameTokenFromSocket,
  setUserAvatar,
} from './actionCreators';
import { AuthActionTypes } from './actionsTypes';

type AuthHandlerFn<F extends (...args: any[]) => any> = ActionFn<AuthState, ReturnType<F>>;

const setState: AuthHandlerFn<typeof authSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setTokens: AuthHandlerFn<typeof authSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setLogin: AuthHandlerFn<typeof authSetLogin> = (
  state,
  { payload },
) => assocPath(['login'], { ...state.login, ...payload }, state);

const setSignUp: AuthHandlerFn<typeof authSetSignUp> = (
  state,
  { payload },
) => assocPath(['signUp'], { ...state.signUp, ...payload }, state);

const setUser: AuthHandlerFn<typeof authSetUser> = (
  state,
  { payload },
) => assocPath(['user'], { ...state.user, ...payload }, state);

const setRanks: AuthHandlerFn<typeof authSetRanks> = (
  state,
  { payload },
) => assocPath(['ranks'], { ...state.ranks, ...payload }, state);

const setUI: AuthHandlerFn<typeof authSetUI> = (
  state,
  { payload },
) => assocPath(['ui'], { ...state.ui, ...payload }, state);

const setOAuth: AuthHandlerFn<typeof authSetUI> = (
  state,
  { payload },
) => assocPath(['oauth'], { ...state.oauth, ...payload }, state);

const setTelegram: AuthHandlerFn<typeof authSetTelegram> = (
  state,
  { payload },
) => assocPath(['telegram'], { ...state.telegram, ...payload }, state);

const setNewGameToken: AuthHandlerFn<typeof setGameToken> = (
  state,
  { payload },
) => assocPath(['game'], payload, state);

const setNewGameTokenFromSocket: AuthHandlerFn<typeof setGameTokenFromSocket> = (
  state,
  { payload },
) => assocPath(['game'], payload, state);

const setNewBalance: AuthHandlerFn<typeof setBalance> = (
  state,
  { payload },
) => assocPath(['user', 'balances', payload.currency], payload.balance, state);

const setNewUserAvatar: AuthHandlerFn<typeof setUserAvatar> = (
  state,
  { payload },
) => assocPath(['user', 'image'], payload.image, state);

export const authHandlers = {
  [AuthActionTypes.SetState]: setState,
  [AuthActionTypes.SetTokens]: setTokens,
  [AuthActionTypes.SetLogin]: setLogin,
  [AuthActionTypes.SetSignUp]: setSignUp,
  [AuthActionTypes.SetUser]: setUser,
  [AuthActionTypes.SetRanks]: setRanks,
  [AuthActionTypes.SetUI]: setUI,
  [AuthActionTypes.SetOAuth]: setOAuth,
  [AuthActionTypes.AuthSetTelegram]: setTelegram,
  [AuthActionTypes.SetGameToken]: setNewGameToken,
  [AuthActionTypes.SetGameTokenFromSocket]: setNewGameTokenFromSocket,
  [AuthActionTypes.SetNewBalance]: setNewBalance,
  [AuthActionTypes.SetUserAvatar]: setNewUserAvatar,
};
