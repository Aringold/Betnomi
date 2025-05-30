import { ChatUser } from '@betnomi/libs/types/chat';
import { Action } from 'redux';
import { ChatState } from '../../types/store/chat';
import { ChatActionTypes } from './actionTypes';
import { ChatRoom } from './constants';
import { ChatRainFormikValues } from '../../hooks/formik/useChatRainFormik';
import { ChatTippingFormikValues } from '../../hooks/formik/useChatTippingFormik';
import {
  ChatRainCallbackErrors,
  ChatTippingCallbackErrors,
} from '../../utils/api/transforms';

export const chatSetState = (payload: Partial<ChatState>) => ({
  type: ChatActionTypes.SetState,
  payload,
});

export const chatSetMessages = (payload: Partial<ChatState['messages']>) => ({
  type: ChatActionTypes.SetMessages,
  payload,
});

export const chatGetUser = (payload: string) => ({
  type: ChatActionTypes.GetUser,
  payload,
});

export const chatSetUser = (payload: { username: string; meta: ChatUser }) => ({
  type: ChatActionTypes.SetUser,
  payload,
});

export const chatSendMessage = (
  text: string,
  file_data: string,
  callback: (error?: string) => void,
) => ({
  type: ChatActionTypes.SendMessage,
  payload: { text, file_data, callback },
});

export const chatChangeRoom = (room: ChatRoom) => ({
  type: ChatActionTypes.ChangeRoom,
  payload: { room },
});

export const chatSendTip = (
  payload: ChatTippingFormikValues,
  callback: (e?: ChatTippingCallbackErrors) => void,
) => ({
  type: ChatActionTypes.SendTip,
  payload,
  callback,
});

export const chatSendRain = (
  payload: ChatRainFormikValues,
  callback: (e?: ChatRainCallbackErrors) => void,
) => ({
  type: ChatActionTypes.SendRain,
  payload,
  callback,
});

export interface SetLastSeenMessageIndex extends Action {
  index: number;
}

export const setLastSeenMessageIndex = (
  index: number,
): SetLastSeenMessageIndex => ({
  type: ChatActionTypes.SetLastSeenMessageIndex,
  index,
});
