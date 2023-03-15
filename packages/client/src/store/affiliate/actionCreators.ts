import { CoinType } from '@betnomi/libs/types';
import { AffiliateState } from '../../types/store/affiliate';
import { AffiliateActionTypes } from './actionTypes';
import { CampaignsAllFormikValues } from '../../hooks/formik/useCampaignsForm';
import { ReferralsAllFormikValues } from '../../hooks/formik/useReferralsForm';

export const affiliateGetAccount = () => ({
  type: AffiliateActionTypes.GetAffiliateAccount,
});

export const affiliateSetAccount = (
  payload: Partial<AffiliateState['userAccount']>,
) => ({
  type: AffiliateActionTypes.SetAffiliateAccount,
  payload,
});

export const WithdrawTransfer = (
  payload: { currency: CoinType },
) => ({
  type: AffiliateActionTypes.AffiliateWithdrawTransfer,
  payload,
});

export const affiliateGetCampaigns = (payload?: CampaignsAllFormikValues) => ({
  type: AffiliateActionTypes.GetAffiliateCampaigns,
  payload,
});

export const affiliateSetCampaigns = (
  payload: Partial<AffiliateState['campaigns']>,
) => ({
  type: AffiliateActionTypes.SetAffiliateCampaigns,
  payload,
});

export const affiliateCreateCampaigns = (
  payload: Partial<AffiliateState['campaignsCreate']>,
) => ({
  type: AffiliateActionTypes.CreateAffiliateCampaigns,
  payload,
});

export const affiliateSetReferrals = (
  payload: Partial<AffiliateState['referrals']>,
) => ({
  type: AffiliateActionTypes.SetAffiliateReferrals,
  payload,
});

export const affiliateGetReferrals = (payload: ReferralsAllFormikValues) => ({
  type: AffiliateActionTypes.GetAffiliateReferrals,
  payload,
});

export const affiliateSetReferralCode = (
  payload: Partial<AffiliateState['referralCode']>,
) => ({
  type: AffiliateActionTypes.SetAffiliateReferralCode,
  payload,
});
