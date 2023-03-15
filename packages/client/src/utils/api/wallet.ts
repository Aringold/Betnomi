import { CoinType } from '@betnomi/libs/types';
import axios from 'axios';
import { api } from '.';
import { ApiPaths } from './constants';

type ProfileGetDepositAddressResponse = {
  currency: string;
  wallet: string;
  destTag: string;
};

export interface WithdrawPreCheckListTypes {
  maxWithdraw: number;
  minWithdraw: number;
  currency: string;
  totalWithdrawnIn24h: number;
}

export interface WithdrawPreCheckResponse {
  totalWithdrawalIn24h: number;
  list: WithdrawPreCheckListTypes,
  globalLimitInUsd: number;
}

export const profileGetDepositAddressApi = (
  currency: CoinType | string,
) => {
  const cancelTokenSource = axios.CancelToken.source();

  return {
    cancel: cancelTokenSource.cancel,
    request: api.post<ProfileGetDepositAddressResponse>(ApiPaths.ProfileDeposit, {
      currency,
      cancelToken: cancelTokenSource.token,
    }),
  };
};

export const profileGetWithdrawPreCheckApi = () => {
  const cancelTokenSource = axios.CancelToken.source();

  return {
    request: api.get<WithdrawPreCheckResponse>(ApiPaths.PreCheck, {
      cancelToken: cancelTokenSource.token,
    }),
    cancel: cancelTokenSource.cancel,
  };
};
