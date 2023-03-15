import { LatestBetsState } from '../../types/store/latestBets';
import { LatestBetsActionTypes } from './actionTypes';

export const fetchBets = () => ({ type: LatestBetsActionTypes.FetchInitialBets });

export const SetInitial = (payload: LatestBetsState) => ({
  type: LatestBetsActionTypes.SetInitialBets,
  payload,
});

export const setNewBet = (payload: LatestBetsState) => ({
  type: LatestBetsActionTypes.SetNewBet,
  payload,
});
