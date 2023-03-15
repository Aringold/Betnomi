interface RatesObject{
  rate: number,
  baseCurrency: string,
  quoteCurrency: string,
}

export interface RatesGetRateResponse {
  rates: RatesObject[];
}
