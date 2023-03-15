import { ActionFn } from '@betnomi/libs/types/redux';
import { RatesActionTypes } from './actionTypes';
import { ratesSetState, ratesSetRatesFromSocket, ratesSetFormUSD } from './actionCreators';
import { RatesState } from '../../types/store/rates';

type RatesHandlerFn<F extends (...args: any[]) => any> = ActionFn<
RatesState,
ReturnType<F>
>;

const setState: RatesHandlerFn<typeof ratesSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setRates: RatesHandlerFn<typeof ratesSetState> = (
  state,
  { payload },
) => ({
  ...state,
  rates: { ...state.rates, ...payload },
});

const setRatesFromSoket: RatesHandlerFn<typeof ratesSetRatesFromSocket> = (
  state,
  { payload },
) => {
  const { base, rate } = payload;

  return ({
    ...state,
    rates: { ...state.rates, [base]: rate },
  });
};

const setRatesFormUSD: RatesHandlerFn<typeof ratesSetFormUSD> = (
  state,
  { payload },
) => ({
  ...state,
  rateFromUSD: { ...state.rateFromUSD, ...payload },
});

export const ratesHandlers = {
  [RatesActionTypes.SetState]: setState,
  [RatesActionTypes.SetRates]: setRates,
  [RatesActionTypes.SetRatesFromSocket]: setRatesFromSoket,
  [RatesActionTypes.SetRateFromUSD]: setRatesFormUSD,
};
