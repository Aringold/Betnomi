import { all, call } from '@redux-saga/core/effects';
// import { BackendErrorResponse } from 'types/api';
import { getCancelBonus } from '../api';
import { GetCancelBonusAction } from '../actionCreators';
import { Unwrap } from '../../../types/unwrap';
import { getBonusesSaga } from './getBonuses';

export function* getCancelBonusSaga(action: GetCancelBonusAction) {
  try {
    const [{ data }]: [
      Unwrap<typeof getCancelBonus>,
    ] = yield all([
      call(getCancelBonus, action.data),
    ]);

    yield call(getBonusesSaga);
    yield () => { console.log(data); };
  } catch (error) {
    // yield put(set2FAError((error as any).response.data as BackendErrorResponse));
  }
}
