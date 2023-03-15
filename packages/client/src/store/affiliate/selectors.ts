import { State } from '../../types/store';

export const selectAffiliateAccount = (state: State) => state.affiliate.userAccount;
export const selectAffiliateCampaigns = (state: State) => state.affiliate.campaigns;
export const selectAffiliateReferrals = (state: State) => state.affiliate.referrals;
export const selectAffiliateReferralCode = (state: State) => state.affiliate.referralCode;
