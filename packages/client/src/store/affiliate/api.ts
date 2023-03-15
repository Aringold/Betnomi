import axios from 'axios';
import { CoinType } from '@betnomi/libs/types';
import { api } from '../../utils/api';

import { ApiPaths } from '../../utils/api/constants';
import {
  AffiliateResponse,
  AffiliateReferralResponse,
  AffiliateReferralRequest,
  AffiliateCampaignsResponse,
  AffiliateCampaignsCreateRequest,
  AffiliateCampaignsCreateResponse,
  AffiliateCampaignsRequest,
  AffiliateTransferWithdrawRequest,
} from './types';

export const affiliateGetUserAccount = () =>
  api.get<AffiliateResponse>(ApiPaths.AffiliateUsersAccounts);

export const getAffiliateReferrals = (data: AffiliateReferralRequest) =>
  api.post<AffiliateReferralResponse>(ApiPaths.AffiliateReferralList, data);

export const getAffiliateCampaigns = (data: AffiliateCampaignsRequest) => {
  const cancelTokenSource = axios.CancelToken.source();
  return api.get<AffiliateCampaignsResponse>(ApiPaths.AffiliateCampaignList, {
    params: { limit: data.limit, offset: data.offset },
    cancelToken: cancelTokenSource.token,
  });
};

export const getAffiliateCreateCampaigns = (data: AffiliateCampaignsCreateRequest) =>
  api.post<AffiliateCampaignsCreateResponse>(ApiPaths.AffiliateCampaignList, data);

export const AffiliateWithdrawTransfer = (currency: CoinType) =>
  api.post<AffiliateTransferWithdrawRequest>(ApiPaths.AffiliateWithdrawTransfer, { currency });
