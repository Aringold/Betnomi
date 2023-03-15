import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper/core';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectAuthUI } from '@betnomi/client/src/store/auth/selectors';
import { selectIsMobile } from '@betnomi/client/src/store/global/selectors';
import {
  GameCategory,
  gameCategoryNames,
} from '../../../constants/gameCategory';
import GameCategoryIcon from '../GameCategoryIcon';
import { FontIcon, FontIconName } from '../../FontIcon';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import styles from './styles.module.scss';

interface Props {
  categories: GameCategory[];
  spaceBetween?: number;
  breakpoints?: SwiperOptions['breakpoints'];
}

const categoryPrev = 'category-prev';
const categoryNext = 'category-next';

SwiperCore.use([Navigation]);

const getSlidesPerView = (
  isChatActive: boolean,
  isMenuActive: boolean,
) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const isMobile = useShallowSelector(selectIsMobile);
  useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });
  let panelWidth = windowInnerWidth;
  if (isChatActive) {
    panelWidth -= isMobile ? 0 : 400;
  }
  if (isMenuActive) {
    panelWidth -= isMobile ? 0 : 182;
  }
  panelWidth = panelWidth > 1500 ? 1500 : panelWidth;
  return Math.round(panelWidth / 73);
};

const GameCategoriesList: FC<Props> = ({ categories, spaceBetween = 16 }) => {
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  let renderCategoryList = categories;
  if (renderCategoryList.length === 0) {
    renderCategoryList = new Array(20).fill(null);
  }

  return (
    <div className={styles.main_wrapper}>
      <button className={cx(styles.arrow, styles.left, categoryPrev)}>
        <FontIcon name={FontIconName.ArrowLeftBold} size={14} />
      </button>
      <button className={cx(styles.arrow, styles.right, categoryNext)}>
        <FontIcon name={FontIconName.ArrowRightBold} size={14} />
      </button>

      <Swiper
        slidesPerView={getSlidesPerView(
          isChatActive,
          isMenuActive,
        )}
        spaceBetween={spaceBetween}
        navigation={{
          prevEl: `.${categoryPrev}`,
          nextEl: `.${categoryNext}`,
        }}
        observeParents
        resizeObserver
        watchOverflow
      >
        {renderCategoryList.map((category, index) => (
          <SwiperSlide key={`${category}-${index.toString()}`}>
            <div className={styles.category_wrapper}>
              <div className={styles.category}>
                {category && <GameCategoryIcon category={category} />}
              </div>
              <div className={styles.name}>{category && gameCategoryNames[category]}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameCategoriesList;
