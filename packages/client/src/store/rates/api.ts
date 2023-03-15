import axios from 'axios';
import { api } from '../../utils/api';
import { ApiPaths } from '../../utils/api/constants';
import { RatesGetRateResponse } from './types';

export const ratesGetRate = (baseCurrency: string, quoteCurrency = 'USD') => {
  const cancelTokenSource = axios.CancelToken.source();

  return {
    request: api.get<RatesGetRateResponse>(ApiPaths.GetRates, {
      params: { baseCurrency, quoteCurrency },
      cancelToken: cancelTokenSource.token,
    }),
    cancel: cancelTokenSource.cancel,
  };
};
