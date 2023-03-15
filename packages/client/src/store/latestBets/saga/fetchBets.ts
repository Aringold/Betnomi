/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';
import { fetchLattestBets } from '../api';
import { Unwrap } from '../../../types/unwrap';
import { SetInitial } from '../actionCreators';

export function* fetchBets() {
  try {
    const { data }: Unwrap<typeof fetchLattestBets> = yield call(
      fetchLattestBets,
    );
    const newArr = data.bets.map((item: any) => {
      item.rgsTransactionId = item.rgs_transaction_id;
      delete item.rgs_transaction_id;
      item.gameName = item.game_name;
      delete item.game_name;
      item.gameId = item.game_id;
      delete item.game_id;
      item.userId = item.user_id;
      delete item.user_id;
      item.userName = item.user_name;
      delete item.user_name;
      item.betAmount = item.bet_amount;
      delete item.bet_amount;
      return item;
    });

    yield put(
      SetInitial(newArr),
    );
  } catch (error) {
    console.log(error);
  }
}
