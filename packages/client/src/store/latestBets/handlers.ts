import { ActionFn } from '@betnomi/libs/types/redux';
import { LatestBetsActionTypes } from './actionTypes';
import { LatestBetsState } from '../../types/store/latestBets';
import { setNewBet, SetInitial } from './actionCreators';

type LatestBetsHandlerFn<F extends (...args: any[]) => any> = ActionFn<LatestBetsState, ReturnType<F>>;

const SetInitialBets: LatestBetsHandlerFn<typeof SetInitial> = (state,
  { payload }) => ({ ...state, data: payload });

const setBets: LatestBetsHandlerFn<typeof setNewBet> = (
  state,
  { payload },
) => {
  const { rgsTransactionId } = payload;
  const { data } = state;
  const idArr = [...data].map((item: any) => item.rgsTransactionId);
  if (idArr.includes(rgsTransactionId) && !payload.multiplier) {
    return ({ ...state });
  }
  if (idArr.includes(rgsTransactionId) && payload.multiplier) {
    const newData = [...data].map((item) => {
      if (item.rgsTransactionId === rgsTransactionId) {
        return payload;
      }
      return item;
    });
    return ({ ...state, data: newData });
  }
  const newData = [...data];
  newData.unshift(payload);
  newData.length = 15;
  return ({ ...state, data: newData });
};
export const latestBetsHandlers = {
  [LatestBetsActionTypes.SetInitialBets]: SetInitialBets,
  [LatestBetsActionTypes.SetNewBet]: setBets,
};
