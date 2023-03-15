/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { put } from 'redux-saga/effects';
import { transformBackendErrorToString } from '../../../utils/api/transforms';
import { profileGetSportsBet, profileSetSportsBet } from '../actionCreators';

export function* sportbetsSaga({
  payload,
}: ReturnType<typeof profileGetSportsBet>) {
  try {
    yield put(profileSetSportsBet({ isLoading: true }));
    //  TODO WHEN READY BACK LOOK in transactionAll for example
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(profileSetSportsBet({ isLoading: false }));
  }
}
