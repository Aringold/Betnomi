import React, { FC } from 'react';
import { Loading } from '@betnomi/libs/components/Loading';
import styles from './styles.module.scss';

interface IProps {
  totalItemsCount: number,
  loadedItemsCount: number,
  isLoading?: boolean,
  loadMoreHandler: () => void,
}
const LoadMore: FC<IProps> = ({
  totalItemsCount, isLoading, loadMoreHandler, loadedItemsCount, 
}) => (
  <div className={styles.loadMore}>
    <div className={styles.progressbar}>
      <span style={{ width: `${((loadedItemsCount ?? 0) * 100) / (totalItemsCount ?? 0)}%` }} />
    </div>
    <p className={styles.displaying}>
      Displaying
      <span className={styles.whiteText}>
        {' '}
        {loadedItemsCount}
        {' '}
      </span>
      of
      <span className={styles.greenText}> 
        {' '}
        {totalItemsCount}
        {' '}
      </span>
      games
    </p>
    {
      isLoading ? <Loading /> :
      <button onClick={loadMoreHandler} disabled={totalItemsCount === loadedItemsCount}>Load More</button>
    }
  </div>
);

export { LoadMore };
