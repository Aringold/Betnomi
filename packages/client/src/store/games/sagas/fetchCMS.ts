import { call, put } from 'redux-saga/effects';
import { Unwrap } from '../../../types/unwrap';
import { transformBackendErrorToString } from '../../../utils/api/transforms';
import { getGames } from '../api';
import { setGames } from '../actionCreators';

export function* fetchCMSGames({ payload }: any) {
  try {
    const { data }: Unwrap<typeof getGames> = yield call(getGames, payload);
    yield put(setGames(data.data));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    // yield put(homeSetGames({ isLoading: false }));
  }
}
