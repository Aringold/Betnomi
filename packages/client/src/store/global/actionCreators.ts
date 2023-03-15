import { GlobalActionTypes } from './actionTypes';
import { GlobalData } from './types';

export const setIsMobile = (payload: Partial<GlobalData>) => ({
  type: GlobalActionTypes.SetIsMobile,
  payload,
});

export const setIsSmallScreen = (payload: Partial<GlobalData>) => ({
  type: GlobalActionTypes.SetIsSmallScreen,
  payload,
});

export const setNewAvatar = (payload: Partial<GlobalData>) => ({
  type: GlobalActionTypes.SetNewAvatar,
  payload,
});
