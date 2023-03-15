/* eslint-disable no-console */
import { centrifugeMessage } from '@betnomi/libs/store/net/centrifuge';
import { put, select, call } from 'redux-saga/effects';
import { values } from 'ramda';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { selectChat, selectUser } from '../selectors';
import { ChatRoom } from '../constants';
import { chatGetUser, chatSetMessages, chatSetUser } from '../actionCreators';
import { chatGetUserInfo } from '../api';
import { Unwrap } from '../../../types/unwrap';

export function* chatMessageSaga({ message: { data } }: ReturnType<typeof centrifugeMessage>) {
  const room = data?.room as ChatRoom;

  if (!data.room || !values(ChatRoom).includes(room)) {
    return;
  }

  const { messages }: ReturnType<typeof selectChat> = yield select(selectChat);
  const items = messages[room];

  yield put(chatGetUser(data.sender_username));
  yield put(chatSetMessages({ [room]: [...items, data] }));
}

export function* chatLoadParticipant({ payload }:ReturnType<typeof chatGetUser>) {
  const user: ReturnType<typeof selectUser> = yield select(selectUser(payload));
  if (!user) {
    try {
      const { data } : Unwrap<typeof chatGetUserInfo> = yield call(chatGetUserInfo, payload);
      // FIXME: get rank from server
      yield put(chatSetUser({ username: data.username, meta: { ...data, rank: PlayerLevel.User } }));
    } catch (e) {
      console.log(e);
    }
  }
}
