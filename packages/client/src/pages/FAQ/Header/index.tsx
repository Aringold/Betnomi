import React, { FC, useState } from 'react';
import { useTranslation } from 'i18n';
import { TextInput } from '@betnomi/libs/components/TextInput';
import searchIcon from '@betnomi/libs/assets/img/icons/search.svg';

import styles from './styles.module.scss';

interface IProps {}

const Header: FC<IProps> = () => {
  const { t } = useTranslation('FAQ');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchValue('');
  };

  return (
    <header className={styles.wrapper}>
      <h1>{t('h1')}</h1>
      <h2>{t('h2')}</h2>
      <TextInput
        value={searchValue}
        type="search"
        onChange={handleSearch}
        handleClearBtn={handleClearBtn}
        left={<img alt="search Icon" src={searchIcon} width={16} height={16} />}
        placeholder={t('search')}
        className={styles.searchInput}
      />
    </header>
  );
};

export { Header };
