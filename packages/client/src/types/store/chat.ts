import { ChatMessage, ChatUser } from '@betnomi/libs/types/chat';
import { ChatRoom } from '../../store/chat/constants';

export interface ChatState {
  isConnected: boolean;
  isSending: boolean;
  messages: Record<ChatRoom, ChatMessage[]>;
  participants: number;
  users: Record<string, ChatUser>;
  room: ChatRoom;
  isHistoryLoaded: boolean;
  lastSeenMessageIndex: number | undefined;
}
