import React, {
  FC, useCallback, useEffect, useRef, useState, 
} from 'react';

import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useUserUI } from 'hooks/useUserUI';
import { useModal } from 'hooks/useModal';
import { useShallowSelector } from 'hooks';
import { selectIsMobile } from 'store/global/selectors';
import { useUser } from 'hooks/useUser';
import { ModalType } from 'store/modal/types';
import styles from './styles.module.scss';
import { useChat } from '../../../hooks/useChat';
import { ChatInput } from '../../../components/chat/ChatInput';
import { ChatHistory } from '../../../components/chat/ChatHistory';
import { ChatHead } from '../../../components/chat/ChatHead';
import { useTranslation } from '../../../i18n';
import { useBase64Uploader } from '../../../hooks/upload/useBase64Uploader';

interface IProps {
  onChatToggle: (val: boolean) => void;
  active: boolean;
}

const noop = () => {};
const allowedTypes = ['image/jpeg', 'image/webp', 'image/png'];

const Chat: FC<IProps> = ({ active, onChatToggle }) => {
  const onClose = useCallback(() => onChatToggle(!active), [
    active,
    onChatToggle,
  ]);
  const input = useRef<HTMLTextAreaElement | null>(null);
  const { t } = useTranslation('main');
  const { showErrorToast, hideToast } = useToasts();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
  const { isChatActive } = useUserUI();

  const [message, setMessage] = useState('');
  const isMobile = useShallowSelector(selectIsMobile);
  const postphonedActions = useRef<Array<() => void>>([]);

  const {
    sendMessage,
    messages,
    users,
    isConnected,
    participants,
    room,
    setRoom,
    showRainModal,
    showTippingModal,
  } = useChat();

  const { active: isModalActive, showModal } = useModal();
  const { isAuthorized } = useUser();

  useEffect(() => {
    if (!isModalActive) {
      document.body.style.overflow = isMobile && active ? 'hidden' : 'auto';
      return () => { document.body.style.overflow = 'auto'; };
    }
  }, [isModalActive, isMobile, active]);

  useEffect(() => {
    if (isAuthorized && postphonedActions.current && postphonedActions.current.length) {
      postphonedActions.current.forEach((action) => action());
      postphonedActions.current = [];
    }
  }, [isAuthorized]);

  const send = () => {
    const cb = (e?: string) => {
      if (input.current) {
        setTimeout(() => input.current!.focus(), 0);
      }

      if (e) {
        showErrorToast(t(e), t('Error'));
      }
    };
    sendMessage(message, '', cb);
    setMessage('');
  };

  const onSend = () => {
    hideToast();
    if (!isAuthorized) {
      showErrorToast(
        t('Please register or sign in to use this feature'),
      );
      showModal(ModalType.SignIn)();
      postphonedActions.current.push(send);
      return;
    } 

    send();
  };

  const onAttach = useCallback(
    (files: string[]) => {
      if (!files?.length || !files[0]) {
        return;
      }

      const cb = (e?: string) => {
        if (input.current) {
          setTimeout(() => input.current!.focus(), 0);
        }

        if (e) {
          showErrorToast(t(e), t('Error'));
        }
      };

      sendMessage('', files[0], cb);
    },
    [sendMessage],
  );

  const onUpload = useBase64Uploader(onAttach, allowedTypes);

  // subscribe to room on change, reconnect and chat initial open
  useEffect(() => {
    if (!active || !input.current || !isConnected) {
      return;
    }

    setRoom(room);
  }, [active, room, setRoom, isConnected]);

  useEffect(() => {
    if (input && input.current) {
      const { scrollHeight, scrollWidth } = input.current;
      if (message.length < scrollWidth / 8) {
        input.current.style.height = '40px';
      } else {
        input.current.style.height = `${scrollHeight}px`;
      }
    }
  }, [message]);

  useEffect(() => {
    if (!isChatActive) {
      setIsEmojiPickerOpen(false);
      setIsGifPickerOpen(false);
    }
  }, [isChatActive]);

  const onWindowclick = (e: any) => {
    const pickerIndex = e.path
      ? e.path.findIndex(
        (element: Element) =>
          element.className === 'emoji-mart' ||
            (element.className?.includes &&
              element.className?.includes('gifPicker')),
      )
      : -1;
    if (
      e.target.className === 'icon-smile' ||
      e.target.className === 'icon-gif' ||
      pickerIndex !== -1
    ) {
      return;
    }
    if (isEmojiPickerOpen) {
      setIsEmojiPickerOpen(false);
    }
    if (isGifPickerOpen) {
      setIsGifPickerOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onWindowclick);
    return () => window.removeEventListener('click', onWindowclick);
  }, [isEmojiPickerOpen, isGifPickerOpen]);

  const openEmojy = () => setIsEmojiPickerOpen(true);
  const onGIFClick = () => {
    setIsEmojiPickerOpen(false);
    setIsGifPickerOpen(true);
  };

  const onEmojiClick = (emoji: string) => {
    const cursorPosition = input?.current?.selectionStart ?? 0;
    setMessage((prevMessage) =>
      [
        prevMessage.slice(0, cursorPosition),
        emoji,
        prevMessage.slice(cursorPosition),
      ].join(''));
    setIsEmojiPickerOpen(false);
    input.current?.focus();
  };

  const onGifSelect = (gifUrl: string) => {
    setIsGifPickerOpen(false);
    if (!isAuthorized) {
      showErrorToast(
        t('Please register or sign in to use this feature'),
      );
      showModal(ModalType.SignIn)();
      postphonedActions.current.push(() => sendMessage('', gifUrl, noop));
    } 
    sendMessage('', gifUrl, noop);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <ChatHead
          online={isConnected}
          participants={participants}
          onClose={onClose}
          room={room}
          setRoom={setRoom}
          active={active}
        />
      </div>

      <div className={styles.chat}>
        <div className={styles.history}>
          {active && (
            <ChatHistory messages={messages} users={users} active={active} />
          )}
        </div>
      </div>
      <div className={styles.input}>
        <ChatInput
          text={message}
          onSend={onSend}
          onTextChange={setMessage}
          onTipClick={showTippingModal}
          onRainClick={showRainModal}
          onGIFClick={onGIFClick}
          onAttachmentsClick={onUpload}
          onEmojiOpen={openEmojy}
          onEmojiClick={onEmojiClick}
          onGifSelect={onGifSelect}
          disabled={!isConnected}
          inputRef={input}
          isEmojiPickerOpen={isEmojiPickerOpen}
          isGifPickerOpen={isGifPickerOpen}
        />
      </div>
    </div>
  );
};

export { Chat };
