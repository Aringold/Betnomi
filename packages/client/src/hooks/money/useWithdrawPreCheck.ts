import { useEffect, useMemo, useState } from 'react';
import { CoinType } from '@betnomi/libs/types';
import { profileGetWithdrawPreCheckApi, WithdrawPreCheckResponse, WithdrawPreCheckListTypes } from '../../utils/api/wallet';
import { TetherSubTypes } from '../../constants/withdraw';

export interface WithdrawPreCheckStateTypes {
  totalWithdrawalIn24h?: number;
  maxWithdraw?: number;
  minWithdraw?: number;
  currency: string;
  totalWithdrawnIn24h?: number;
  globalLimitInUsd?: number;
}

export const useWithdrawPreCheck = (currency: TetherSubTypes | CoinType) => {
  const [preCheckData, setPreCheckData] = useState<WithdrawPreCheckResponse>();

  useEffect(() => {
    const { cancel, request } = profileGetWithdrawPreCheckApi();

    request.then(({ data }) => {
      setPreCheckData(data);
    }).catch(() => {
    });

    return () => {
      if (cancel) {
        cancel();
      }
    };
  }, []);

  const getWithdrawByCurrency = useMemo(
    () => Object(preCheckData?.list || []).find((item: WithdrawPreCheckListTypes) => item.currency === currency),
    [preCheckData, currency],
  );

  return {
    globalLimitInUsd: preCheckData?.globalLimitInUsd,
    minWithdraw: getWithdrawByCurrency?.minWithdraw,
    maxWithdraw: getWithdrawByCurrency?.maxWithdraw,
    totalWithdrawnIn24h: getWithdrawByCurrency?.totalWithdrawnIn24h,
    totalWithdrawalIn24h: preCheckData?.totalWithdrawalIn24h,
  };
};
