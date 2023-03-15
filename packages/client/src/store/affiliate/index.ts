import createReducer from '@betnomi/libs/utils/createReducer';
import { AffiliateHandlers } from './handlers';
import { AffiliateState } from '../../types/store/affiliate';

export const affiliateInitialState: Readonly<AffiliateState> = {
  userAccount: {
    isLoading: false,
    list: undefined,
  },
  campaigns: {
    isLoading: false,
    code: undefined,
    total: 0,
    limit: 10,
    offset: 0,
  },
  referrals: {
    isLoading: false,
    list: undefined,
    total: 0,
    limit: 10,
    offset: 0,
  },
  campaignsCreate: {
    isLoading: false,
    code: '',
    campaignName: '',
  },
  referralCode: {
    active: false,
    url: '',
  },
};

export default createReducer(affiliateInitialState, AffiliateHandlers);
