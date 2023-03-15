import { AffiliateAccountList, AffiliateReferralList, AffiliateCampaignsList } from '../../store/affiliate/types';

export interface AffiliateState {
  userAccount: {
    isLoading: boolean,
    list: AffiliateAccountList,
  },
  campaigns: {
    isLoading: boolean,
    total: number;
    limit: number,
    offset: number,
    code: AffiliateCampaignsList,
  },
  campaignsCreate: {
    isLoading: boolean,
    code: string,
    campaignName: string,
  },
  referrals: {
    isLoading: boolean,
    total: number;
    limit: number,
    offset: number,
    list: AffiliateReferralList,
  },
  referralCode: {
    url: string,
    active: boolean,
  }
}
