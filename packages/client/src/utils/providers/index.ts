import { useShallowSelector } from '../../hooks';
import { selectAssets } from '../../store/home/selectors';
import gameProviders from './gameProviders';

export const getProviders = () => {
  const { assetList } = useShallowSelector(selectAssets);

  let res = [];
  res = gameProviders.map((obj: any) => {
    const index = assetList.findIndex((el: any) => el.id === obj.id);
    const asset = index !== -1 ? assetList[index].asset : '';
    return {
      ...obj,
      asset,
    };
  });
  return res;
};
