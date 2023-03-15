import { takeLeading } from 'redux-saga/effects';
import { AffiliateActionTypes } from '../actionTypes';

import {
  fetchAffiliates,
  fetchReferrals,
  fetchCampaigns,
  fetchCreateCampaigns,
  fetchTransferWithdraw,
} from './fetchAffiliates';

export default function* profileSaga() {
  yield takeLeading(AffiliateActionTypes.GetAffiliateAccount, fetchAffiliates);
  yield takeLeading(AffiliateActionTypes.GetAffiliateReferrals, fetchReferrals);
  yield takeLeading(AffiliateActionTypes.GetAffiliateCampaigns, fetchCampaigns);
  yield takeLeading(AffiliateActionTypes.CreateAffiliateCampaigns, fetchCreateCampaigns);
  yield takeLeading(AffiliateActionTypes.AffiliateWithdrawTransfer, fetchTransferWithdraw);
}
