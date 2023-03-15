import { ActionFn } from '@betnomi/libs/types/redux';
import { GlobalActionTypes } from './actionTypes';
import { setIsMobile, setIsSmallScreen, setNewAvatar } from './actionCreators';
import { GlobalData } from './types';

type GlobalHandlerFn<F extends (...args: any[]) => any> = ActionFn<
GlobalData,
ReturnType<F>
>;

const globalSetIsMobile: GlobalHandlerFn<typeof setIsMobile> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const globalSetIsSmallScreen: GlobalHandlerFn<typeof setIsSmallScreen> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const globalSetNewAvatar: GlobalHandlerFn<typeof setNewAvatar> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const globalHandlers = {
  [GlobalActionTypes.SetIsMobile]: globalSetIsMobile,
  [GlobalActionTypes.SetIsSmallScreen]: globalSetIsSmallScreen,
  [GlobalActionTypes.SetNewAvatar]: globalSetNewAvatar,
};
