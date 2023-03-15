import React, { useState, SyntheticEvent, useEffect } from 'react';

import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { TextInput } from '@betnomi/libs/components/TextInput';
import SearchSVG from '@betnomi/libs/assets/img/icons/search.svg';
import { IGif } from '@giphy/js-types';
import RecentSVG from '@betnomi/libs/assets/img/icons/recent.svg';
import TrendingSVG from '@betnomi/libs/assets/img/icons/trending.svg';

import classNames from 'classnames';
import { useUser } from 'hooks/useUser';
import styles from './styles.module.scss';

const gifFetch = new GiphyFetch('zedb64LEr3D19ygZksVVWMn382KCas1A');

interface GifAnalytics extends IGif{
  analytics: {
    onclick: {
      url: string;
    }
  }
}

interface Props {
  onGifClick: (gifUrl: string) =>void;
  pickerWidth: number;
}

export const GifPicker: React.FC<Props> = ({ onGifClick, pickerWidth }) => {
  const [searchText, setSearchText] = useState('');
  const [searchKey, setSearchKey] = useState(searchText);

  const { id } = useUser();

  useEffect(() => setSearchKey(searchText), [searchText]);

  const onSearchChange = (event: SyntheticEvent<HTMLInputElement>) => setSearchText(event.currentTarget.value);
  const fetchGifs = () => gifFetch.search(searchKey || 'trending');

  const gifClickHandler = (gif: IGif, event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    onGifClick(gif.images.original.url);
    const timeStamp = (new Date()).getTime();
    fetch(`${(gif as GifAnalytics).analytics.onclick.url}&ts=${timeStamp}&user_id=${id}`);
  };

  const selectRecents = () => {
    setSearchKey('random');
    setSearchText(''); 
  };
  const selectTrendings = () => {
    setSearchKey('trending');
    setSearchText('');
  };

  return (
    <div className={classNames(styles.pickerContainer, 'gifPicker')} style={{ width: pickerWidth }}>
      <div className={styles.header}>
        <button className={styles.recentGifs} onClick={selectRecents}>
          <img src={RecentSVG} alt="recent" />
        </button>
        <button className={styles.trending} onClick={selectTrendings}>
          <img src={TrendingSVG} alt="trending" />
        </button>
        <TextInput
          value={searchText}
          onChange={onSearchChange}
          className={styles.input}
          left={<img src={SearchSVG} alt="search" />}
          placeholder="Search"
          withSeparator
        />
      </div>
      <Grid
        className={styles.gifPicker}
        width={pickerWidth - 16}
        columns={3}
        gutter={8}
        fetchGifs={fetchGifs}
        key={searchKey}
        onGifClick={gifClickHandler}
      />
    </div>
  );
};
