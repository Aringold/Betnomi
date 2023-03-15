import { CoinType } from '@betnomi/libs/types';

export type AffiliateAccountItem = {
  currency: CoinType;
  balance: string;
  totalEarned: string;
  totalWithdrawn: string;
};

export type AffiliateReferralItem = {
  userName: string;
  userCreatedAt: string;
  firstDeposit: string;
  lastDeposit: string;
  wagered: number;
  commission: number;
  depositCount: number;
};

export type AffiliateReferralRequest = {
  limit: number,
  offset: number,
};

export type AffiliateCampaignsItem = {
  id: string;
  code: string;
  url: string;
  details: [];
  campaignName: string;
};

export type AffiliateCampaignsRequest = {
  limit?: number,
  offset?: number,
};

export type AffiliateCampaignsCreateRequest = {
  code?: string,
  campaignName?: string,
};

export type AffiliateAccountList = AffiliateAccountItem[] | undefined;
export type AffiliateReferralList = AffiliateReferralItem[] | undefined;
export type AffiliateCampaignsList = AffiliateCampaignsItem[] | undefined;

export type AffiliateReferralResponse = {
  total: number;
  list: AffiliateReferralList;
};

export type AffiliateResponse = {
  list: AffiliateAccountList;
};

export type AffiliateCampaignsResponse = {
  total: number;
  code: AffiliateCampaignsList;
};

export type AffiliateCampaignsCreateResponse = {
  id: string;
};

export interface AffiliateTransferWithdrawRequest {
  currency: CoinType
}
