/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination,
  Autoplay, SwiperOptions,
} from 'swiper/core';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { Banner } from '@betnomi/client/src/types/store/home';
import { ImgIx } from '@betnomi/client/src/components/common/Imgix';
import classNames from 'classnames';
import Skeleton from '@betnomi/libs/components/Skeleton';
import styles from './styles.module.scss';

interface Props {
  banners: Banner[],
  autoplay?: boolean
  delay?: number
  withPagination?: boolean,
  items: number,
  breakpoints?: SwiperOptions['breakpoints'],
  isSmall: boolean,
  children?: (item: any) => void,
  onMoreClick: () => void;
}

SwiperCore.use([Pagination, Autoplay]);

const pagination: PaginationOptions = {
  el: 'pagination',
  clickable: true,
  bulletClass: styles.bullet,
  bulletActiveClass: styles.active,
  modifierClass: `${styles.pagination} `,
};

const BannerList: FC<Props> = ({
  banners,
  autoplay,
  delay = 5000,
  withPagination = false,
  items,
  breakpoints,
  isSmall,
  onMoreClick,
}) => {
  let renderBanners = banners;
  if (banners.length === 0) {
    renderBanners = Array(5).fill(null);
  }

  return (
    <div className={styles.wrapper}>
      <Swiper
        slidesPerView={items}
        spaceBetween={30}
        pagination={withPagination ? pagination : false}
        autoplay={autoplay ? { delay } : false}
        className={withPagination ? styles.pagination_padding : ''}
        breakpoints={breakpoints}
        observeParents
        resizeObserver
        allowSlidePrev={renderBanners?.length !== 1}
        allowSlideNext={renderBanners?.length !== 1}
      >
        {renderBanners.map((banner: Banner) => (
          <SwiperSlide key={banner.id}>
            {
              banner ? (
                <ImgIx
                  src={banner.banner ?? ''}
                  className={classNames(styles.banner, { [styles.mobileBanner]: isSmall })}
                  parentClass={styles.bannerParent}
                  height={isSmall ? 355 : 384}
                  imgixParams={{ q: 20, ar: isSmall ? '700:355' : '1400:384' }}
                />
              ) : <Skeleton width={isSmall ? 700 : 1400} height={isSmall ? 355 : 384} />
            }
            <button
              className={classNames(styles.moreButton, { [styles.mobileMore]: isSmall })}
              onClick={onMoreClick}
            >
              {isSmall ? 'Learn More' : 'Find Out More'}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerList;
