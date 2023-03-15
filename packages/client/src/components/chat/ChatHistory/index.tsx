import React, {
  FC, useCallback, useEffect, useMemo, useState, useRef, 
} from 'react';
import { useDispatch } from 'react-redux';
import { ChatMessage, ChatUser } from '@betnomi/libs/types/chat';
import {
  AutoSizer, CellMeasurer, CellMeasurerCache, List, 
} from 'react-virtualized';
import { debounce } from 'throttle-debounce';
import { RenderedRows } from 'react-virtualized/dist/es/List';
import { createPortal } from 'react-dom';
import { ChatMessageItem } from '@betnomi/libs/components/chat/ChatMessage';
import { SentMessage } from '@betnomi/libs/components/chat/SentMessage';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { setLastSeenMessageIndex } from 'store/chat/actionCreators';
import { useShallowSelector } from 'hooks';
import { selectLastSeenMessageIndex } from 'store/chat/selectors';
import { useIsTabActive } from 'hooks/common';
import styles from './styles.module.scss';
import { useUser } from '../../../hooks/useUser';
import { ChatMessageContent } from '../ChatMessageContent';
import { ChatNewMessagesCount } from '../ChatNewMessagesCount';

interface IProps {
  messages: ChatMessage[];
  users: Record<string, ChatUser>;
  active: boolean;
}

const ROW_SIZE = 85;

const isEmoji = (text: string) => {
  const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  return regexExp.test(text) && text.length === 2;
};

const ChatHistory: FC<IProps> = ({ messages, users, active }) => {
  const ref = useRef<List | null>(null);
  const [currentMessage, setCurrentMessage] = useState(0);
  const { name } = useUser();
  const lastSeenMessageIndex = useShallowSelector(selectLastSeenMessageIndex) ?? 0;
  const newMessagesCount = messages.length - lastSeenMessageIndex - 1;
  const dispatch = useDispatch();
  const isTabActive = useIsTabActive();

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: ROW_SIZE,
      }),
    [],
  );

  const getSender = (username: string):ChatUser => {
    const defUser:ChatUser = {
      username,
      image: '',
      wager: 0,
      rank: PlayerLevel.User,
    };

    return users[username] || defUser;
  };

  const rowRenderer = useCallback(
    ({
      index, parent, key, style,
    }) => (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ registerChild, measure }) => {
          const isOnlyEmoji = isEmoji(messages[index].text);
          return (
            <div
              ref={(el) => registerChild!(el as Element)}
              style={{
                ...style,
                paddingTop: index === 0 ? '20px' : undefined,
                paddingBottom: index === messages.length - 1 ? '30px' : undefined, 
              }}
              className={styles.row}
            >
              {messages[index].sender_username !== name ? (

                <ChatMessageItem
                  image={getSender(messages[index].sender_username).image}
                  progress={getSender(messages[index].sender_username).wager} // messages[index].sender_wager || 0}
                  level={getSender(messages[index].sender_username).rank} // {messages[index].sender_rank}
                  username={getSender(messages[index].sender_username).username}
                  timestamp={messages[index].created_at}
                  isOnlyEmoji={isOnlyEmoji}
                >
                  <ChatMessageContent message={messages[index]} onUpdate={measure} />
                </ChatMessageItem>
              ) : (
                <SentMessage isOnlyEmoji={isOnlyEmoji} timestamp={messages[index].created_at}>
                  <ChatMessageContent message={messages[index]} onUpdate={measure} />
                </SentMessage>
              )}
            </div>
          );
        }}
      </CellMeasurer>
    ),
    [messages, users, cache, name],
  );

  const onRowsRendered = useCallback(
    debounce<(info: RenderedRows) => void>(100, false, ({ stopIndex }) =>
      setCurrentMessage(stopIndex)),
    [setCurrentMessage],
  );

  const scrollToBottom = useCallback(() => {
    if (!ref.current) {
      return;
    }

    // FIXME for some reason it is not scrolling untill the end so it needs double scroll to reach the end.
    ref.current.scrollToRow(messages.length);
    ref.current.scrollToRow(messages.length);
  }, [ref, messages.length]);

  useEffect(() => {
    setTimeout(() => scrollToBottom());
  }, []);

  // auto-scrolls to bottom
  useEffect(() => {
    if (currentMessage === lastSeenMessageIndex && lastSeenMessageIndex < (messages.length - 1) && isTabActive) {
      scrollToBottom();
    } 
  }, [messages.length, ref, active, currentMessage, lastSeenMessageIndex]);

  // sets last seen message
  useEffect(() => {
    if (currentMessage > lastSeenMessageIndex) {
      dispatch(setLastSeenMessageIndex(currentMessage));
    }
  }, [currentMessage]);

  return (
    <>
      {createPortal(
        <span className={styles.hud}>
          <div>
            Message at the bottom:
            {currentMessage}
          </div>

          <div>
            Last seen message:
            {lastSeenMessageIndex}
          </div>
          <div>
            New messages:
            {newMessagesCount}
          </div>
        </span>,
        document.body,
      )}

      <AutoSizer>
        {({ width, height }) => (
          <List
            scrollToAlignment="end"
            estimatedRowSize={85}
            ref={ref}
            height={height}
            rowHeight={cache.rowHeight}
            rowCount={messages.length}
            width={width}
            rowRenderer={rowRenderer}
            className={styles.list}
            overscanRowCount={0}
            onRowsRendered={onRowsRendered}
          />
        )}
      </AutoSizer>

      <ChatNewMessagesCount count={newMessagesCount} onClick={scrollToBottom} />
    </>
  );
};
export { ChatHistory };
