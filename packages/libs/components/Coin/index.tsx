import React, { useCallback } from 'react';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectAssets } from '@betnomi/client/src/store/home/selectors';
import { coinIcons, CoinType } from '../../types/ui';
import { ImgIx } from '../../../client/src/components/common/Imgix';

type Props = {
  coin: CoinType;
  className?: string;
  size?: number;
};

const Coin: React.FC<Props> = ({ coin, className, size = 44 }) => {
  const { assetList } = useShallowSelector(selectAssets);

  const getCoinIcon = useCallback((CoinName: string) => assetList.find(({ name }) => name.toLowerCase() === CoinName)?.asset, [coin, assetList]);

  const name = coinIcons[coin];
  return (
    <ImgIx
      src={getCoinIcon(name) ?? 'default'}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Coin;
