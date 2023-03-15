import { takeLeading } from '@redux-saga/core/effects';
import { BonusesActionTypes } from 'store/bonuses/actionTypes';
import { getBonusesSaga } from './getBonuses';
import { getClaimBonusSaga } from './getClaimBonus';
import { getCancelBonusSaga } from './getCancelBonus';

export default function* bonusesSaga() {
  yield takeLeading(BonusesActionTypes.GetBonuses, getBonusesSaga);
  yield takeLeading(BonusesActionTypes.GetClaimBonus, getClaimBonusSaga);
  yield takeLeading(BonusesActionTypes.GetCancelBonus, getCancelBonusSaga);
}
