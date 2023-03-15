import { call, put, select } from 'redux-saga/effects';
import {
  connectToCentrifuge, disconnectCentrifuge, 
} from '@betnomi/libs/store/net/centrifuge';
import { getRates } from 'store/rates/sagas/getRates';
import { ratesSetRates, ratesSetState } from 'store/rates/actionCreators';
import { isExpired } from 'react-jwt';
import { CentrifugeSuffixes } from '../../../constants/centrifuge';
import { Unwrap } from '../../../types/unwrap';
import { selectAuthTokens } from '../../auth/selectors';
import { chatGetGuestToken } from '../api';
import { selectChat } from '../selectors';

export function* chatGetGuestChatTokenSaga() {
  const { data: { token } }: Unwrap<typeof chatGetGuestToken> = yield call(chatGetGuestToken);
  return token;
}

export function* chatConnectCentrifuge() {
  try {
    const { isConnected }: ReturnType<typeof selectChat> = yield select(selectChat);
    const { access, refresh }: ReturnType<typeof selectAuthTokens> = yield select(
      selectAuthTokens,
    );
    if (isConnected && !isExpired(access)) {
      yield put(disconnectCentrifuge(CentrifugeSuffixes.Chat));
      yield put(connectToCentrifuge(CentrifugeSuffixes.Chat, access));
      return;
    }

    if (!isExpired(access) && refresh) {
      yield put(connectToCentrifuge(CentrifugeSuffixes.Chat, access));
      return;
    }

    const chatToken: Unwrap<typeof chatGetGuestChatTokenSaga> = yield call(
      chatGetGuestChatTokenSaga,
    );
    
    const rates: Unwrap<typeof getRates> = yield call(getRates, 'USD');

    yield put(ratesSetRates(rates));
    yield put(
      ratesSetState({
        lastLoadedAt: new Date(),
      }),
    );

    yield put(connectToCentrifuge(CentrifugeSuffixes.Chat, chatToken));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Can\'t connect to chat!');

    // TODO: handle reconnect?!!
  }
}
