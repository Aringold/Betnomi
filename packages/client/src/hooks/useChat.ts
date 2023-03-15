import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from './index';
import { selectChat, selectChatMessagesFor } from '../store/chat/selectors';
import { chatChangeRoom, chatSendMessage } from '../store/chat/actionCreators';
import { ChatRoom } from '../store/chat/constants';
import { modalShow } from '../store/modal/actionCreators';
import { ModalType } from '../store/modal/types';

export const useChat = () => {
  const dispatch = useDispatch();
  const {
    isConnected, isSending, participants, room, users,
  } = useShallowSelector(
    selectChat,
  );

  const messages = useShallowSelector(selectChatMessagesFor(ChatRoom.English));

  const sendMessage = useCallback(
    (text: string, file_data: string, callback: (e?: string) => void) =>
      dispatch(chatSendMessage(text, file_data, callback)),
    [],
  );

  const setRoom = useCallback(
    (val: ChatRoom) => dispatch(chatChangeRoom(val)),
    [dispatch],
  );

  const showTippingModal = useCallback(
    () => dispatch(modalShow(ModalType.ChatTipping)),
    [dispatch],
  );

  const showRainModal = useCallback(
    () => dispatch(modalShow(ModalType.ChatRain)),
    [dispatch],
  );

  return {
    showTippingModal,
    showRainModal,
    isConnected,
    isSending,
    sendMessage,
    messages,
    users,
    participants,
    room,
    setRoom,
  };
};
