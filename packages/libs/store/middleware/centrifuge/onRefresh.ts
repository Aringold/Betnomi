import { MiddlewareAPI } from 'redux';
import { State } from '@betnomi/client/src/types/store';
import { RefreshResponse } from 'centrifuge';
import { authLogout } from '@betnomi/client/src/store/auth/actionCreators';
import { refreshTokens } from '@betnomi/client/src/store/refresh';
import { decodeToken } from 'react-jwt';

export const onRefresh = (store: MiddlewareAPI<any, State>) => (
  ctx: object,
  cb: (val: RefreshResponse) => void,
) => {
  (async () => {
    try {
      let token = store.getState().auth.access;
      const expirationTime = (decodeToken(token) as { exp: number })?.exp;
      if (expirationTime && (expirationTime + 2) * 1000 < Date.now()) {
        store.dispatch(authLogout());
        return;
      }
      token = await refreshTokens(store);
      cb({
        status: 200,
        data: { token },
      });
    } catch (e) {
      store.dispatch(
        authLogout({ reason: `centrifuge refresh error ${e.message}` }),
      );
    }
  })();
};
