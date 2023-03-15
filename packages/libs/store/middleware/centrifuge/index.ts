/* eslint-disable @typescript-eslint/naming-convention */
import { MiddlewareAPI } from 'redux';
import { State } from '@betnomi/client/src/types/store';
import Centrifuge, { Subscription } from 'centrifuge';
import {
  setBalance,
  setGameTokenFromSocket,
} from '../../../../client/src/store/auth/actionCreators';
import { setNewBet } from '../../../../client/src/store/latestBets/actionCreators';
import { ratesSetRatesFromSocket } from '../../../../client/src/store/rates/actionCreators';

import { CentrifugeActionTypes } from '../../../types/store/centrifuge';
import {
  centrifugeActionWithSuffix,
  centrifugeConnected,
  centrifugeDisconnected,
  centrifugeHistory,
  centrifugeMessage,
} from '../../net/centrifuge';
import { onRefresh } from './onRefresh';
import { onTransportClose } from './onTransportClose';
import { ChatMessage } from '../../../types/chat';

import { parseJwt } from '../../../hooks/unicodeJWT';

const centrifugeMiddleware = (
  serverUrl: string,
  channels: string[],
  suffix: string = '',
) => {
  let centrifuge: Centrifuge;
  let subscriptions: Record<string, Subscription> = {};

  return (store: MiddlewareAPI<any, State>) => (
    next: (action: any) => void,
  ) => (action: any) => {
    switch (action.type) {
      case centrifugeActionWithSuffix(CentrifugeActionTypes.Connect, suffix): {
        const { token }: { token: string } = action.payload;
        centrifuge = new Centrifuge(serverUrl, {
          onRefresh: onRefresh(store),
          onTransportClose: onTransportClose(store, suffix),
        });
        if (token) {
          centrifuge.setToken(token);
        }

        centrifuge.on('connect', (ctx) => {
          store.dispatch(centrifugeConnected(suffix, ctx));
        });

        centrifuge.on('disconnect', (ctx) => {
          store.dispatch(centrifugeDisconnected(suffix, ctx));
        });

        centrifuge.subscribe('public:realtime', (message) => {
          if (message.data.type === 'bet.new') {
            const {
              rgs_transaction_id,
              user_id,
              user_name,
              currency,
              bet_amount,
              game_id,
              game_name,
              payout,
            } = message.data.data;
            store.dispatch(
              setNewBet({
                rgsTransactionId: rgs_transaction_id,
                userId: user_id,
                userName: user_name,
                currency,
                payout,
                betAmount: bet_amount,
                gameId: game_id,
                gameName: game_name,
              }),
            );
          }
          if (message.data.type === 'bet.won') {
            const {
              rgs_transaction_id,
              user_id,
              user_name,
              payout,
              currency,
              multiplier,
              bet_amount,
              game_id,
              game_name,
            } = message.data.data;
            store.dispatch(
              setNewBet({
                rgsTransactionId: rgs_transaction_id,
                userId: user_id,
                userName: user_name,
                payout,
                currency,
                multiplier,
                betAmount: bet_amount,
                gameId: game_id,
                gameName: game_name,
              }),
            );
          }
          if (message.data.type === 'currency.rate') {
            const { base, rate } = message.data.data;
            const data = { base, rate };
            store.dispatch(ratesSetRatesFromSocket(data));
          }
        });

        const user = parseJwt(token);
        centrifuge.subscribe(`realtime#${user.sub}`, (message) => {
          if (message.data.type === 'balance.update') {
            store.dispatch(
              setBalance({
                currency: message.data.data.currency,
                balance: message.data.data.balance,
              }),
            );
          }
          if (message.data.type === 'currency.update') {
            const { game_token } = message.data.data;
            if (game_token.token && game_token.expiresAt) {
              store.dispatch(
                setGameTokenFromSocket({
                  GameToken: game_token.token,
                  ExpiresAt: game_token.expiresAt,
                }),
              );
            }
          }
        });

        centrifuge.subscribe('english');
        centrifuge.connect();
        break;
      }

      case centrifugeActionWithSuffix(
        CentrifugeActionTypes.Unsubscribe,
        suffix,
      ): {
        const { room } = action;

        if (!subscriptions[room]) {
          return next(action);
        }

        subscriptions[room].unsubscribe();

        break;
      }

      case centrifugeActionWithSuffix(
        CentrifugeActionTypes.Subscribe,
        suffix,
      ): {
        const { room } = action;

        if (subscriptions[room]) {
          return next(action);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        subscriptions[room] = centrifuge.subscribe(room, (message) => {
          store.dispatch(centrifugeMessage(suffix, message));
        });

        subscriptions[room].history({ limit: 0 })
          .then((result) =>
            subscriptions[room].history({ since: { epoch: result.epoch, offset: result.offset - 200 }, limit: 200 }))
          .then((result) => {
            console.log(result);
            const messages = result.publications.map(
              (item) => item.data as ChatMessage,
            );
            store.dispatch(centrifugeHistory(suffix, messages));
          });

        break;
      }

      case centrifugeActionWithSuffix(
        CentrifugeActionTypes.Disconnect,
        suffix,
      ): {
        if (centrifuge) {
          centrifuge.disconnect();
          subscriptions = {};
        }

        break;
      }

      case centrifugeActionWithSuffix(CentrifugeActionTypes.SetToken, suffix): {
        if (action.token) {
          centrifuge.setToken(action.token);
        }
        break;
      }

      default:
        return next(action);
    }
  };
};

export { centrifugeMiddleware };
