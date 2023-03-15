import React, { FC, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@betnomi/libs/components/Button';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import im1 from '@betnomi/libs/assets/img/promotions/Group_67.jpg';
import im2 from '@betnomi/libs/assets/img/promotions/Group_68.jpg';
import { usePagination } from 'hooks/usePagination';
import { LoadMore } from '../Casino/Content/LoadMore';
import { Routes } from '../../constants/routes';
import styles from './styles.module.scss';

interface IProps {}

export const promotions = [
  {
    id: '12321321',
    img: im1,
    title: 'It’s here! The Betnomi Android & iOS',
    text: 'After months of developing and testing, the new Betnomi Android App has finally landed. We’re talking over 2,600 slots, table games ...',
  },
  {
    id: '143124124',
    img: im2,
    title: 'It’s here! The Betnomi Android & iOS',
    text: 'After months of developing and testing, the new Betnomi Android App has finally landed. We’re talking over 2,600 slots, table games ...',
  },
];

const Promotions: FC<IProps> = () => {
  const { t } = useTranslation('main');
  const history = useHistory();
  const gridRef = useRef<HTMLUListElement | null>(null);
  const { visibleSource, handleLoadMore } = usePagination(promotions, gridRef);
  
  const handleOpenPromotion = (item: any) => {
    history.push(`${Routes.Promotions}/${item.id}`);
  };

  return (
    <div className={styles.page}>
      <h1>Promotions</h1>

      <ul ref={gridRef} className={styles.promotionsList}>
        {promotions && visibleSource.map((item, id) => (
          <li role="presentation" onClick={() => handleOpenPromotion(item)} key={`item ${id.toString()}`} className={styles.listItem}>
            <img src={item.img} alt="Promotion" />
            <div>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.text}>{item.text}</p>

              <Button className={styles.button}>{t('Read more')}</Button>
            </div>
          </li>
        ))}
      </ul>
      <LoadMore totalItemsCount={promotions.length} loadedItemsCount={visibleSource.length} loadMoreHandler={handleLoadMore} />
    </div>
  );
};

export default Promotions;
