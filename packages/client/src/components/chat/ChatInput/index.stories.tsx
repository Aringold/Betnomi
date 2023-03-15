import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { ChatInput } from './index';

storiesOf('Chat', module).add('ChatInput', () => {
  const t = text(
    'Text',
    'because I see you ..you want help. Befor hours u said my depo. Not now. lolI I catch you 😊',
  );
  const onSend = action('onSend');
  const onTextChange = action('onTextChange');
  const onAttachmentsClick = action('onAttachmentsClick');
  const onGIFClick = action('onGIFClick');
  const onRainClick = action('onRainClick');
  const onTipClick = action('onTipClick');
  const onEmojiClick = action('onEmojiClick');
  const onEmojiOpen = action('onEmojiOpen');
  const onGifSelect = action('onGifSelect');

  return (
    <div
      style={{
        backgroundColor: 'var(--color-background-tabs)',
        padding: 16,
        borderRadius: 8,
      }}
    >
      <ChatInput
        text={t}
        onSend={onSend}
        onTextChange={onTextChange}
        onAttachmentsClick={onAttachmentsClick}
        onGIFClick={onGIFClick}
        onGifSelect={onGifSelect}
        onRainClick={onRainClick}
        onTipClick={onTipClick}
        onEmojiOpen={onEmojiOpen}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
});
