/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useState, useRef, useEffect, useCallback,
} from 'react';
import { useTranslation } from 'i18n';
import { TextInput } from '@betnomi/libs/components/TextInput';

import searchIcon from '@betnomi/libs/assets/img/icons/search.svg';
import { useShallowSelector } from 'hooks';
import { selectAuthUI } from 'store/auth/selectors';
import { selectIsMobile } from 'store/global/selectors';
import cx from 'classnames';
import { SelectWrap } from '../Select';
import { Option } from '../../casinoPageProviders';
import styles from './styles.module.scss';
import { ImgIx } from '../../../../components/common/Imgix';

interface SearchData{
  game_id: number;
  name: string;
  provider_title: string;
  thumbnail: string;
}

interface IProps {
  serchData: SearchData[],
  optionsSportBetResult: Option[],
  onSelectedProviderChange: (selectedProviders: string[]) => void,
  onSelectedTab?: (type: string) => void,
  onSelectSearch: (element: SearchData) => void;
  onChangeSearch: (value: string) => void;
  selectedOptions?: string[],
  thumbnailWidth?: number,
  thumbnailHeight?: number,
}

const SearchPanel: FC<IProps> = ({
  onSelectedProviderChange, onSelectedTab, onSelectSearch, onChangeSearch, selectedOptions,
  serchData, optionsSportBetResult, thumbnailWidth = 45, thumbnailHeight = 60,
}) => {
  const { t } = useTranslation();
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const isMobile = useShallowSelector(selectIsMobile);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const [compressedBar, setCompressed] = useState(false);

  // for search
  const [searchValue, setSearchValue] = useState('');
  const [searchResultIsOpen, setSearchResultIsOpen] = useState(false);
  const [searchableItems, setSearchableItems] = useState<any>([]);
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
    onChangeSearch(e.target.value);
    if (e.target.value) {
      setSearchResultIsOpen(true);
    }
  };
  const handleClearBtn = () => {
    setSearchValue('');
    setSearchResultIsOpen(false);
  };
  const handleSearchBlur = () => {
    setSearchResultIsOpen(false);
  };

  const handleSearchItemClick = (element: SearchData) => () => {
    setSearchResultIsOpen(false);
    onSelectSearch(element);
  };

  const handleSearchFocus = () => {
    if (searchValue) {
      setSearchResultIsOpen(true);
    }
  };

  const resizeHandler = useCallback(
    () => {
      if (!searchBarRef.current) {
        return;
      }
      if (searchBarRef.current?.clientWidth < 900) {
        setCompressed(true);
      } else {
        setCompressed(false);
      }
    }, [searchBarRef],
  );

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  useEffect(() => {
    setTimeout(() => resizeHandler(), 200);
  }, [isChatActive, isMenuActive]);

  const [popularSlotsList, setPopularSlotsList] = useState('All');
  const handlePopularSlots = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLElement;
    if (target.nodeName !== 'LI') return;
    const { slotName } = target.dataset;
    if (slotName) {
      setPopularSlotsList(slotName);
      if (onSelectedTab) {
        onSelectedTab(slotName);
      }
    }
  };

  const handleSearchVisibleResults = () => {
    const result = serchData && serchData.filter(
      (elem: { name: string; }) =>
        elem.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
    setSearchableItems(result);
  };

  useEffect(() => {
    handleSearchVisibleResults();
    return () => handleSearchVisibleResults();
  }, [searchValue, serchData.length]);

  const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1000px)').matches;

  return (
    <div ref={searchBarRef} className={isMobile || compressedBar ? `${styles.searchPanel} ${styles.compressed}` : styles.searchPanel}>
      <div className={cx(styles.popularSlotBlock, { [styles.active]: isChatActive && smallScreen })}>
        <ul onClick={handlePopularSlots} className={styles.popularSlotsList}>
          <li data-slot-name="All" className={popularSlotsList === 'All' ? styles.active : ''}>{t('All')}</li>
          <li data-slot-name="Feature" className={popularSlotsList === 'Feature' ? styles.active : ''}>{t('Feature')}</li>
          <li data-slot-name="Popular" className={popularSlotsList === 'Popular' ? styles.active : ''}>{t('Popular')}</li>
        </ul>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <TextInput
            value={searchValue}
            type="search"
            onChange={handleSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            handleClearBtn={handleClearBtn}
            left={<img alt="search Icon" src={searchIcon} width={16} height={16} />}
            placeholder={t('Search for games')}
            className={styles.searchInput}
          />
        </div>

        <SelectWrap optionsSportBetResult={optionsSportBetResult} selectedOptions={selectedOptions} onSelectedProviderChange={onSelectedProviderChange} />

        {searchResultIsOpen && (
        <div className={styles.searchResult}>
          <p>
            We found
            {' '}
            {searchableItems.length}
            {' '}
            results for
            {' '}
            {searchValue}
          </p>
          <ul className={styles.searchResultlist}>
            {searchableItems.map(
              (elem: SearchData) =>
                (
                  <li key={elem.game_id} onMouseDown={handleSearchItemClick(elem)}>
                    <ImgIx
                      src={elem.thumbnail ?? 'default'}
                      width={thumbnailWidth}
                      height={thumbnailHeight}
                    />
                    <p>
                      <span>
                        {elem.name}
                      </span>
                      <span>{elem.provider_title}</span>
                    </p>
                  </li>
                ),
            )}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};

export { SearchPanel };
