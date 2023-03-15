/* eslint-disable no-console */
/* eslint-disable max-len */
import React, {
  FC, SyntheticEvent, useState, useMemo, 
} from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import SearchIcon from '@betnomi/libs/assets/img/icons/search.svg';
import { coinNames, CoinType } from '@betnomi/libs/types/ui';
import Coin from '@betnomi/libs/components/Coin';
import { CheckboxSwitcher } from '@betnomi/libs/components/CheckboxSwitcher';
import SortIcon from '@betnomi/libs/assets/img/icons/sort_top.svg';

import { useShallowSelector } from 'hooks';
import { selectCryptoCurrencies } from 'store/settings/selectors';
import { useDispatch } from 'react-redux';
import { setCryptoCurrency } from 'store/settings/actionCreators';
import styles from './styles.module.scss';

const ascendingSort = (a: string, b: string) => (a > b ? 1 : -1);
const descendingSort = (a: string, b: string) => (a < b ? 1 : -1);

enum SortDirection {
  Asc = 'ascending',
  Desc = 'descending',
}

export const ManageCurrencyForm: FC = () => {
  const cryptoCurrencies = useShallowSelector(selectCryptoCurrencies);
  const [searchText, setSearchText] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Asc);

  const dispatch = useDispatch();

  const filteredAndSortedCriptoCurrencies = useMemo(() => (Object.keys(cryptoCurrencies) as CoinType[])
    .filter((currency) => currency.includes(searchText.toUpperCase()) ||
     (coinNames[currency].toUpperCase()).includes(searchText.toUpperCase()))
    .sort(sortDirection === SortDirection.Asc ? ascendingSort : descendingSort),
  [cryptoCurrencies, searchText, sortDirection]);

  const switchCurrency = (name: string) => 
    dispatch(setCryptoCurrency(name, !cryptoCurrencies[name]));

  return (
    <>
      <TextInput 
        value={searchText}
        onChange={(e: SyntheticEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)}
        name="searchInput"
        left={<img src={SearchIcon} alt="search" />}
        className={styles.input}
        withSeparator
      />
      <button
        className={styles.sort_btn}
        onClick={() => 
          setSortDirection(sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc)}
      >
        My Coins
        <img src={SortIcon} alt="sort" />
      </button>
      <div>
        {filteredAndSortedCriptoCurrencies.map((name) => (
          <div key={name} className={styles.currency_wrap}>
            <div className={styles.icon_wrap}>
              <Coin coin={name as CoinType} size={24} />
              <p className={styles.coin_name}>{name}</p>
            </div>
            <div className={styles.switcher_wrap}>
              <p className={styles.full_name}>{coinNames[name as CoinType]}</p>
              <CheckboxSwitcher checked={cryptoCurrencies[name]} onCheck={() => switchCurrency(name)} />
            </div>
          </div>
        ))}

      </div>
    </>
  );
};
