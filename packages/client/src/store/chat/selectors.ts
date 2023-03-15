import { State } from '../../types/store';
import { ChatRoom } from './constants';

export const selectChat = (state: State) => state.chat;
export const selectChatMessages = (state: State) => state.chat.messages;
export const selectChatMessagesFor = (room: ChatRoom) => (state: State) =>
  state.chat.messages[room];
export const selectUser = (username: string) => (state: State) =>
  state.chat.users[username];
export const selectLastSeenMessageIndex = (state: State) => state.chat.lastSeenMessageIndex;
