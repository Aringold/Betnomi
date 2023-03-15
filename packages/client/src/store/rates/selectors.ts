import { State } from '../../types/store';

export const selectRates = (state: State) => state.rates;
export const selectRatesRates = (state: State) => state.rates.rates;
export const selectRateFromUSD = (state: State) => state.rates.rateFromUSD;
