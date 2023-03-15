import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Navigation, Pagination } from 'swiper';

import ArrowButton, { ArrowType } from '@betnomi/libs/components/ArrowButton';
import cx from 'classnames';

import styles from './styles.module.scss';

SwiperCore.use([Pagination, Navigation]);

const testimonials = [
  {
    id: 1, name: 'Alex Solomon', position: 'CEO Spin Gambling', text: 'Our partnership with Betnomi has been a pleasure. The team is highly professional, cooperative, and responsive.',
  },
];

const TestimonialsSection: FC = () => {
  const { t } = useTranslation('affiliate');

  return (
    <section className={styles.testimonials}>
      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>{t('Testimonials')}</h2>
          <p className={styles.subTitle}>{t('What our partners and clients say. Read our reviews and ratings.')}</p>
        </div>

        <div className={cx(styles.sliderWrap, { [styles.more]: testimonials.length > 1 })}>
          {
            testimonials.length > 1 && (
              <div className={styles.buttons}>
                <ArrowButton
                  type={ArrowType.left}
                  className={cx('prev-testimonials', styles.right_margin, 'prev-btn')}
                  size={24}
                />
                <ArrowButton className="next-testimonials" size={24} />
              </div>
            )
          }

          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.active,
              modifierClass: styles.pagination,
            }}
            observeParents
            resizeObserver
            watchOverflow
            autoHeight={false}
            direction="vertical"
            navigation={{
              prevEl: '.prev-testimonials',
              nextEl: '.next-testimonials',
            }}
            className={styles.swiper}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className={styles.swiperItem}>
                <div className={styles.tesWrapper}>
                  <p className={styles.tesText}>{`"${item.text}"`}</p>
                  <p className={styles.tesName}>{item.name}</p>
                  <p className={styles.tesPosition}>{item.position}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
