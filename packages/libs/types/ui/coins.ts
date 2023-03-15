export enum CoinType {
  bitcoin = 'BTC',
  ethereum = 'ETH',
  sbni = 'SBNI',
  litecoin = 'LTC',
  binancecoin = 'BNB',
  ripple = 'XRP',
  doge = 'DOGE',
  bitcoincash = 'BCH',
  tron = 'TRX',
  tether = 'USDT',
  dash = 'DASH',
  zcash = 'ZCH',
  erc20 = 'ERC20',
  bep20 = 'BEP20',
  trc20 = 'TRC20',
}
export type CoinWithAllType = CoinType | 'ALL';
export type CoinTypeWithAll = { [key: string]: CoinWithAllType };

export const WithALLCoinType: CoinTypeWithAll = { all: 'ALL', ...CoinType };

export const coinNames: Record<CoinType, string> = {
  [CoinType.ethereum]: 'Ethereum',
  [CoinType.binancecoin]: 'Binance Coin',
  [CoinType.sbni]: 'SBNI',
  [CoinType.bitcoin]: 'Bitcoin',
  [CoinType.bitcoincash]: 'Bitcoin Cash',
  [CoinType.dash]: 'Dash',
  [CoinType.doge]: 'Doge',
  [CoinType.litecoin]: 'Litecoin',
  [CoinType.ripple]: 'Ripple',
  [CoinType.tether]: 'Tether',
  [CoinType.tron]: 'Tron',
  [CoinType.zcash]: 'Z-Cash',
  [CoinType.erc20]: 'Ethereum (ETH)',
  [CoinType.bep20]: 'Binance Smart chain (BSC)',
  [CoinType.trc20]: 'Tron (TRX)',
};

export const WithALLCoinNames: Record<CoinType, string> = { ...coinNames, [WithALLCoinType.all]: 'All' };

export const coinIcons: Record<CoinType, string> = {
  [CoinType.ethereum]: 'ethereum',
  [CoinType.sbni]: 'sbni',
  [CoinType.binancecoin]: 'binancecoin',
  [CoinType.bitcoin]: 'bitcoin',
  [CoinType.bitcoincash]: 'bitcoincash',
  [CoinType.dash]: 'dash',
  [CoinType.doge]: 'doge',
  [CoinType.litecoin]: 'litecoin',
  [CoinType.ripple]: 'ripple',
  [CoinType.tether]: 'tether',
  [CoinType.tron]: 'tron',
  [CoinType.zcash]: 'zcash',
  [CoinType.erc20]: 'ethereum',
  [CoinType.trc20]: 'tron',
  [CoinType.bep20]: 'binancecoin',
};

export const coinOrder: CoinType[] = [
  CoinType.bitcoin,
  CoinType.ethereum,
  CoinType.sbni,
  CoinType.litecoin,
  CoinType.tether,
  CoinType.ripple,
  CoinType.tron,
  CoinType.doge,
  CoinType.binancecoin,
  CoinType.bitcoincash,
];

export const WithALLCoinOrder: CoinWithAllType[] = ['ALL', ...coinOrder];

export const emptyBalances = coinOrder.reduce(
  (acc, coin) => ({ ...acc, [coin]: Math.random() }),
  {} as Record<CoinType, number>,
);
