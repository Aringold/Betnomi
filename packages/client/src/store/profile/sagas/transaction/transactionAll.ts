/* eslint-disable no-console */
import { call, put, select } from 'redux-saga/effects';
import { selectProfileDepositAll, selectProfileTransactionAll } from 'store/profile/selectors';
import {
  profileGetTransactionAll,
  profileSetTransactionAll,
  profileSetDepositAll,
  profileGetDepositAll,
} from '../../actionCreators';
import { transformBackendErrorToString } from '../../../../utils/api/transforms';
import { transactionsDepositsGetAll, transactionsGetAll } from '../../api';
import { Unwrap } from '../../../../types/unwrap';
import { DepositAllRequest, TransactionAllRequest } from '../../types';

export function* transactionAllSaga({
  payload,
}: ReturnType<typeof profileGetTransactionAll>) {
  try {
    yield put(profileSetTransactionAll({
      isLoading: true,
      limit: payload.limit,
      offset: payload.offset,
    }));
    const {
      toDate,
      fromDate,
    } = yield select(selectProfileTransactionAll);

    const modifiedData: TransactionAllRequest = {
      limit: payload.limit,
      offset: payload.offset,
      toDate: Math.trunc(toDate / 1000),
      transactionTypes: [payload.transactionTypes.value],
      resultTypes: [payload.resultTypes.value],
      fromDate: Math.trunc(fromDate / 1000),
    };

    const { data }: Unwrap <typeof transactionsGetAll> = yield call(
      transactionsGetAll, modifiedData,
    );

    yield put(profileSetTransactionAll({
      total: data.total,
      list: data.list,
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(profileSetTransactionAll({ isLoading: false }));
  }
}

export function* depositAllSaga({
  payload,
}: ReturnType<typeof profileGetDepositAll>) {
  try {
    yield put(profileSetDepositAll({
      isLoading: true,
      limit: payload.limit,
      offset: payload.offset,
    }));
    const {
      toDate,
      fromDate,
    } = yield select(selectProfileDepositAll);

    const modifiedData: DepositAllRequest = {
      limit: payload.limit,
      offset: payload.offset,
      toDate: Math.trunc(toDate / 1000),
      transactionTypes: [payload.transactionTypes.value],
      resultTypes: [payload.resultTypes.value],
      fromDate: Math.trunc(fromDate / 1000),
      currency: payload.currency !== 'ALL' ? payload.currency : undefined,
      txId: payload.txId !== '' ? payload.txId : undefined,
    };

    const { data }: Unwrap <typeof transactionsDepositsGetAll> = yield call(
      transactionsDepositsGetAll, modifiedData,
    );

    yield put(profileSetDepositAll({
      total: data.total,
      list: data.list,
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(profileSetDepositAll({ isLoading: false }));
  }
}
