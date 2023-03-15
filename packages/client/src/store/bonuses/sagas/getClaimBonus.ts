import { all, call } from '@redux-saga/core/effects';
// import { BackendErrorResponse } from 'types/api';
import { getClaimBonus } from '../api';
import { GetClaimBonusAction } from '../actionCreators';
import { Unwrap } from '../../../types/unwrap';
import { getBonusesSaga } from './getBonuses';

export function* getClaimBonusSaga(action: GetClaimBonusAction) {
  try {
    const [{ data }]: [
      Unwrap<typeof getClaimBonus>,
    ] = yield all([
      call(getClaimBonus, action.data),
    ]);
    yield call(getBonusesSaga);

    yield () => { console.log(data); };
  } catch (error) {
    // yield put(set2FAError((error as any).response.data as BackendErrorResponse));
  }
}
