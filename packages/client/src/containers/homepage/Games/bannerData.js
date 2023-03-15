import BannerMob3 from '@betnomi/libs/assets/img/banner/bannerMob_3.jpg';

import BannerWeb3 from '@betnomi/libs/assets/img/banner/bannerWeb_3.jpg';

import { useShallowSelector } from '../../../hooks';
import { selectIsMobile } from '../../../store/global/selectors';
import { useUserUI } from '../../../hooks/useUserUI';

export const getBanners = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { isChatActive } = useUserUI();
  const smallScreen = window.matchMedia(
    '(min-width:769px) and (max-width: 1250px)',
  ).matches;

  const banners = [
    {
      image:
        isMobile || (isChatActive && smallScreen) ? BannerMob3 : BannerWeb3,
      link: '#',
    },
  ];

  return banners;
};
