import React, { useMemo } from 'react';
import { ImgIx } from '../../common/Imgix';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../../hooks';
import { selectAssets } from '../../../store/home/selectors';

export const LoginBanner: React.FC = () => {
  const { assetList } = useShallowSelector(selectAssets);
  const LoginBannerImage = useMemo(() => assetList.find(({ id }) => id === 59)?.asset, [assetList]);

  return (<ImgIx src={LoginBannerImage ?? 'default'} className={styles.banner} height={150} />);
};
