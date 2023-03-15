import { ActionFn } from '@betnomi/libs/types/redux';
import { assocPath } from 'ramda';
import { ChatActionTypes } from './actionTypes';
import { ChatState } from '../../types/store/chat';
import {
  chatSetMessages,
  chatSetState,
  chatSetUser,
  SetLastSeenMessageIndex,
} from './actionCreators';

type ChatHandlerFn<F extends (...args: any[]) => any> = ActionFn<
ChatState,
ReturnType<F>
>;

const setState: ChatHandlerFn<typeof chatSetState> = (state, { payload }) => ({
  ...state,
  ...payload,
});

const setMessages: ChatHandlerFn<typeof chatSetMessages> = (
  state,
  { payload },
) => assocPath(['messages'], { ...state.messages, ...payload }, state);

const setUser: ChatHandlerFn<typeof chatSetUser> = (state, { payload }) =>
  assocPath(['users', payload.username], payload.meta, state);

const setLastSeenMessageIndex = (
  state: ChatState,
  action: SetLastSeenMessageIndex,
) => 
  ({
    ...state,
    lastSeenMessageIndex: action.index,
  });

export const chatHandlers = {
  [ChatActionTypes.SetState]: setState,
  [ChatActionTypes.SetMessages]: setMessages,
  [ChatActionTypes.SetUser]: setUser,
  [ChatActionTypes.SetLastSeenMessageIndex]: setLastSeenMessageIndex,
};
