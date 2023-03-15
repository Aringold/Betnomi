import { assocPath } from 'ramda';
import { ActionFn } from '@betnomi/libs/types/redux';
import { affiliateSetAccount, affiliateSetReferralCode, affiliateSetReferrals } from './actionCreators';
import { AffiliateState } from '../../types/store/affiliate';
import { AffiliateActionTypes } from './actionTypes';

type AffiliateHandlerFn<F extends (...args: any[]) => any> = ActionFn<AffiliateState, ReturnType<F>>;

const setAffiliateAccount: AffiliateHandlerFn<typeof affiliateSetAccount> = (
  state,
  { payload },
) => assocPath(['userAccount'], { ...state.userAccount, ...payload }, state);

const setAffiliateReferral: AffiliateHandlerFn<typeof affiliateSetReferrals> = (
  state,
  { payload },
) => assocPath(['referrals'], { ...state.referrals, ...payload }, state);

const setAffiliateReferralCode: AffiliateHandlerFn<typeof affiliateSetReferralCode> = (
  state,
  { payload },
) => assocPath(['referralCode'], { ...state.referralCode, ...payload }, state);

const setAffiliateCampaigns: AffiliateHandlerFn<typeof affiliateSetReferrals> = (
  state,
  { payload },
) => assocPath(['campaigns'], { ...state.campaigns, ...payload }, state);

export const AffiliateHandlers = {
  [AffiliateActionTypes.SetAffiliateAccount]: setAffiliateAccount,
  [AffiliateActionTypes.SetAffiliateReferrals]: setAffiliateReferral,
  [AffiliateActionTypes.SetAffiliateReferralCode]: setAffiliateReferralCode,
  [AffiliateActionTypes.SetAffiliateCampaigns]: setAffiliateCampaigns,
};
