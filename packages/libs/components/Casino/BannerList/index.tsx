/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, SwiperOptions } from 'swiper/core';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { ImgIx } from '../../../../client/src/components/common/Imgix';
import styles from './styles.module.scss';

export interface Banner {
  image: string;
  imageFront?: string;
  link: string;
  title?: string;
  subTitleFirst?: string;
  subTitleSecond?: string;
  text?: string;
  text2?: string;
}

interface Props {
  banners: any;
  autoplay?: boolean;
  delay?: number;
  withPagination?: boolean;
  items: number;
  breakpoints?: SwiperOptions['breakpoints'];
  children?: (item: any) => void;
  overlay?: any;
}

SwiperCore.use([Pagination, Autoplay]);

const pagination: PaginationOptions = {
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
  overlay,
}) => {
  const history = useHistory();

  const handlePlayGame = (game: any) => {
    if (!game.game_id) return;

    history.push({
      pathname: `/casino/${game.game_id}`,
      state: { game, from: 'games' },
    });
  };
  
  return (
    <div className={styles.wrapper}>
      <Swiper
        slidesPerView={items}
        spaceBetween={25}
        pagination={withPagination ? pagination : false}
        autoplay={autoplay ? { delay } : false}
        className={withPagination ? styles.pagination_padding : ''}
        breakpoints={breakpoints}
        observeParents
        resizeObserver
      >
        {banners &&
        banners.map((banner: any, index: any) => (
          <SwiperSlide key={banner.image + index}>
            <ImgIx
              className={styles.banner}
              src={banner.image}
              width={400}
              imgixParams={{ ar: '400:250' }}
              onClick={() => {
                handlePlayGame(banner);
              }}
            />
            {overlay && overlay(banner)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerList;
