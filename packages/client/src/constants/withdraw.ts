import { CoinType } from '@betnomi/libs/types';

export const withdrawPairs: Partial<Record<CoinType, CoinType[]>> = {
  [CoinType.tether]: [CoinType.erc20, CoinType.bep20, CoinType.trc20],
};

export enum TetherSubTypes {
  USDT = 'USDT',
  TRX = 'USDT_TRX',
  BNB = 'USDT_BNB',
}

export const withdrawPairsByPreCheck: Partial<Record<CoinType, TetherSubTypes>> = {
  [CoinType.erc20]: TetherSubTypes.USDT,
  [CoinType.bep20]: TetherSubTypes.BNB,
  [CoinType.trc20]: TetherSubTypes.TRX,
};
