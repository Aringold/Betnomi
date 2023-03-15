import React, { FC, useEffect } from 'react';
import { ChatMessage } from '@betnomi/libs/types/chat';
import { isMessageGif } from 'utils/helpers';
import { ChatImageMessage } from '../ChatImageMessage';
import { ChatTextMessage } from '../ChatTextMessage';
import { ChatTipMessage } from '../ChatTipMessage';
import { ChatRainMessage } from '../ChatRainMessage';
import { ChatGifMesssage } from '../ChatGifMessage';

interface Props {
  message: ChatMessage;
  onUpdate: () => void
}

const ChatMessageContent: FC<Props> = ({ message, onUpdate }) => {
  useEffect(() => onUpdate(), []);

  if (isMessageGif(message)) {
    return (
      <ChatGifMesssage url={message.file_name} onLoad={onUpdate} />
    );
  }

  if (message.file_name) {
    return <ChatImageMessage messageId={message.id} onLoad={onUpdate} />;
  }

  if (message.tip) {
    return <ChatTipMessage sender={message.sender_username} tip={message.tip} />;
  }

  if (message.rain) {
    return <ChatRainMessage sender={message.sender_username} rain={message.rain} message={message.text} />;
  }

  return (
    <ChatTextMessage>{message.text}</ChatTextMessage>
  );
};

export { ChatMessageContent };
