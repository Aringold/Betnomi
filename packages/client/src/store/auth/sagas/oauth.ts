import { call, put, select } from 'redux-saga/effects';
import { authOAuthLogin, authOAuthSignup, authSetOAuth } from '../actionCreators';
import { modalHide, modalShow } from '../../modal/actionCreators';
import { ModalType } from '../../modal/types';
import { selectAuthOAuth } from '../selectors';
import { authCheckLoginExists, authPostOAuthSignup } from '../api';
import { AuthOAuthSignupRequest } from '../types';
import { Unwrap } from '../../../types/unwrap';
import { authSetTokensAndFetchUserDataSaga } from './login';

const parseGame = (gameString: string) => {
  const tokenStart = gameString.indexOf('Token:');
  const tokenEnd = gameString.indexOf(',');
  const expiresAtStart = gameString.indexOf('ExpiresAt:');
  const expiresAtEnd = gameString.slice(expiresAtStart).indexOf(',');

  if (tokenStart === -1 || tokenEnd === -1 || expiresAtStart === -1 || expiresAtEnd === -1) {
    return { token: '', expiresAt: '' };
  }

  const token = gameString.slice(tokenStart + 6, tokenEnd);
  const expiresAt = gameString.slice(expiresAtStart).slice(10, expiresAtEnd);
  return { token, expiresAt };
};

export function* oauthLoginSaga({
  payload: { data },
}: ReturnType<typeof authOAuthLogin>) {
  const { session } = data.payload;
 
  const { token, expiresAt } = session?.game ? parseGame(session.game) : { token: '', expiresAt: '' };

  if (session?.access && session?.refresh) {
    yield call(authSetTokensAndFetchUserDataSaga, {
      ...session, 
      game: { token, expiresAt },
      playCurrency: session.play_currency,
    });
    yield put(modalHide()); 
    return;
  }

  yield put(
    authSetOAuth({
      token: data.payload.token,
      provider: data.payload.provider,
    }),
  );

  yield put(modalShow(ModalType.OAuthSignup));
}

export function* oauthSignupSaga({
  payload,
  callback,
}: ReturnType<typeof authOAuthSignup>) {
  try {
    const { token }: ReturnType<typeof selectAuthOAuth> = yield select(
      selectAuthOAuth,
    );

    const request: AuthOAuthSignupRequest = {
      login: payload.login,
    };

    const exist: Unwrap<typeof authCheckLoginExists> = yield call(
      authCheckLoginExists,
      payload.login,
    );
    if (exist) {
      throw new Error('Username already taken');
    }

    const {
      data,
    }: Unwrap<typeof authPostOAuthSignup> = yield call(
      authPostOAuthSignup,
      request,
      token,
    );

    callback();
    yield call(authSetTokensAndFetchUserDataSaga, data);
    yield put(modalHide());
  } catch (e) {
    callback(e.message);
  }
}
