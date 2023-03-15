import { RatesState } from '../../types/store/rates';
import { RatesActionTypes } from './actionTypes';

export const ratesSetState = (payload: Partial<RatesState>) => ({
  type: RatesActionTypes.SetState,
  payload,
});

export const ratesSetRates = (payload: Partial<RatesState['rates']>) => ({
  type: RatesActionTypes.SetRates,
  payload,
});

export const ratesSetRatesFromSocket = (payload: any) => ({
  type: RatesActionTypes.SetRatesFromSocket,
  payload,
});

export const ratesSetFormUSD = (payload: Partial<RatesState['rateFromUSD']>) => ({
  type: RatesActionTypes.SetRateFromUSD,
  payload,
});

export const ratesGetFormUSD = () => ({
  type: RatesActionTypes.GetRateFromUSD,
});
