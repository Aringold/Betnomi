import React, { FC, useCallback } from 'react';
import { coinIcons, CoinType } from '@betnomi/libs/types';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectAssets } from '@betnomi/client/src/store/home/selectors';
import { ImgIx } from '../../../client/src/components/common/Imgix';

interface ImgProps {
  imgData: string;
  className?: string;
  width?: number;
  height?: number;
}

const CoinImg: FC<ImgProps> = ({
  imgData, className, width, height, 
}) => {
  const { assetList } = useShallowSelector(selectAssets);

  const checkType = (name: string) => {
    if (name === 'BTC') {
      return CoinType.bitcoin;
    }
    if (name === 'ETH') {
      return CoinType.ethereum;
    }
    if (name === 'BCH') {
      return CoinType.bitcoincash;
    }
    if (name === 'LTC') {
      return CoinType.litecoin;
    }
    if (name === 'BNB') {
      return CoinType.binancecoin;
    }
    if (name === 'XRP') {
      return CoinType.ripple;
    }
    if (name === 'DOGE') {
      return CoinType.doge;
    }
    if (name === 'TRX') {
      return CoinType.tron;
    }
    if (name === 'USDT') {
      return CoinType.tether;
    }
    if (name === 'DASH') {
      return CoinType.dash;
    }
    if (name === 'ZEC') {
      return CoinType.zcash;
    }
    if (name === 'SBNI') {
      return CoinType.sbni;
    }
    return CoinType.bitcoin;
  };

  const name = coinIcons[checkType(imgData)];

  const getCoinIcon = useCallback((CoinName: string) => assetList.find((item) => item.name.toLowerCase() === CoinName)?.asset, [assetList]);

  return <ImgIx src={getCoinIcon(name) ?? 'default'} width={width ?? 16} height={height ?? 16} className={className} />;
};

export { CoinImg };
