import {
  useState, useEffect, RefObject, useRef, useCallback,
} from 'react';
import { useShallowSelector } from 'hooks';
import { selectIsMobile } from 'store/global/selectors';
import { useUserUI } from './useUserUI';

const ADD_ROWS_COUNT = 3;

export const usePagination = <T extends any>(source: T[], parentRef: RefObject<HTMLElement>, handleData?: (limit: number, offset: number) => void, isLoading?: boolean, withBigItem = false, defaultGridColumnWidth = 0) => {
  const { isChatActive, isMenuActive } = useUserUI();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = useRef<number>(0);
  const prevLoading = useRef(false);
  const [visibleSource, setVisibleSource] = useState<T[]>([]);
  const isMobile = useShallowSelector(selectIsMobile);
  const prevElementsCountToShow = useRef(0);

  const resize = (callback?: (elementsPerRow: number) => void) => {
    if (parentRef?.current) {
      const parentWidth = parentRef.current.getBoundingClientRect().width;
      const gridGap = Number(getComputedStyle(parentRef.current).columnGap.replace('px', ''));
      const gridColumnWidth = Number(getComputedStyle(parentRef.current).gridTemplateColumns.split(' ')[0].replace('px', '')) || defaultGridColumnWidth;
      const elementsPerRow = Math.floor((parentWidth + gridGap) / (gridGap + gridColumnWidth));
      pageSize.current = elementsPerRow * ADD_ROWS_COUNT;
      callback?.(elementsPerRow);
    }
  };

  const onResize = useCallback(() => resize((elementsPerRow: number) => {
    const elementsCountToShow = elementsPerRow * (visibleSource.length > elementsPerRow * ADD_ROWS_COUNT ?
      Math.floor(visibleSource.length / elementsPerRow) : ADD_ROWS_COUNT);
    if (prevElementsCountToShow.current !== elementsPerRow && source.length) {
      setVisibleSource(source.slice(0, elementsCountToShow - (withBigItem ? 2 : 0)));
      setCurrentPage(Math.floor(elementsCountToShow / (elementsPerRow * ADD_ROWS_COUNT)));
      prevElementsCountToShow.current = elementsPerRow;
    }

    if (!isMobile && (source.length !== 0 && elementsCountToShow - (withBigItem ? 2 : 0) > source.length)) {
      if (handleData) {
        handleData(elementsCountToShow - (withBigItem ? 2 : 0) - source.length, source.length);
      }
    }
  }), [isMobile, visibleSource.length, source.length]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    setTimeout(onResize, 1000);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize, source.length]);

  useEffect(() => {
    if (source.length === 0) {
      setTimeout(() => resize((elementsPerRow: number) => {
        if (handleData) {
          handleData(elementsPerRow * ADD_ROWS_COUNT - (withBigItem ? 2 : 0), 0);
        }
      }), 1000);
    }
  }, [source.length]);

  useEffect(() => {
    if (prevLoading.current !== isLoading) {
      setVisibleSource(source.slice(0, (currentPage + 1) * pageSize.current - (withBigItem ? 2 : 0)));

      setCurrentPage(currentPage + 1);
      prevLoading.current = Boolean(isLoading);
    }
  }, [isLoading, source.length]);

  useEffect(() => {
    if (!isMobile) {
      setTimeout(onResize, 1000);
    }
  }, [isChatActive, isMenuActive, onResize]);

  const handleLoadMore = () => {
    if (currentPage * pageSize.current >= source.length) {
      if (handleData) {
        handleData(pageSize.current, source.length);
      }
    } else {
      const availableRows = Math.floor((source.length - visibleSource.length) / (pageSize.current / ADD_ROWS_COUNT));

      if (availableRows > 0) {
        setVisibleSource([...visibleSource, ...source.slice(visibleSource.length - 1, (visibleSource.length - 1) + availableRows * (pageSize.current / ADD_ROWS_COUNT))]);
      } else if (handleData) {
        const remainsRows = (source.length - visibleSource.length) - availableRows * (pageSize.current / ADD_ROWS_COUNT);

        handleData(pageSize.current - remainsRows, source.length);
      }
    }
  };

  return {
    currentPage, visibleSource, handleLoadMore, setVisibleSource,
  };
};
