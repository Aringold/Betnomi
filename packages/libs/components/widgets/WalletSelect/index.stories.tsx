import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoinType } from '@betnomi/libs/types';
import { select } from '@storybook/addon-knobs';
import { keys } from 'ramda';
import { action } from '@storybook/addon-actions';
import { WalletSelect } from './index';
import { useFakeBalances } from '../../../hooks/storybook/useFakeBalances';
import { useFakeCoins } from '../../../hooks/storybook/useFakeCoins';

storiesOf('Basic', module).add('WalletSelect', () => {
  const balances = useFakeBalances();
  const rates = useFakeBalances();
  const coins = useFakeCoins();

  const selected = select<CoinType>('Selected', coins, keys(coins)[0]);
  const onChange = action('onChange');
  const onDepositClick = action('onDepositClick');
  const onSettingsClick = action('onSettingsClick');

  return (
    <WalletSelect
      balances={balances}
      selected={selected}
      rates={rates}
      onChange={onChange}
      onDepositClick={onDepositClick}
      onSettingsClick={onSettingsClick}
    />
  );
});
