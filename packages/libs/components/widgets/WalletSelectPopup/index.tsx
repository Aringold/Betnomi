import React, { FC, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useUser } from '@betnomi/client/src/hooks/useUser';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectCryptoCurrencies, selectViewInFiatCurrency } from '@betnomi/client/src/store/settings/selectors';
import { setViewInFiatCurrency } from '@betnomi/client/src/store/settings/actionCreators';
import { CurrencySymbol } from '../../../utils/currency';
import { ButtonColor, coinOrder, CoinType } from '../../../types';
import Coin from '../../Coin';
import styles from './styles.module.scss';
import Button from '../../Button';
import { FontIcon, FontIconName } from '../../FontIcon';
import { Balance } from '../../Balance';
import { Toggle } from '../../Toggle';

interface Props {
  balances: Partial<Record<CoinType, number>>;
  selected: CoinType;
  rates: Partial<Record<CoinType, number>>;
  onSelect: (val: CoinType) => void;
  onDepositClick: () => void;
  onSettingsClick: () => void;
  handleDropdownClick: () => void;
}

const Row: FC<{
  coin: CoinType;
  balance: number;
  rate: number;
  withRates: boolean;
  currencySymbol: string;
}> = ({
  coin, balance, rate, withRates, currencySymbol,
}) => (
  <>
    <Coin coin={coin} size={16} />

    <div className={styles.coin_name}>{coin}</div>

    {withRates ? (
      <div className={styles.coin_rate}>
        <div className={styles.coin_in_usd}>
          {currencySymbol}
          <Balance value={rate * balance} precision={6} />
        </div>

        <div className={styles.coin_rate_balance}>
          <Balance value={balance} />
        </div>
      </div>
    ) : (
      <div className={styles.coin_balance}>
        <Balance value={balance} />
      </div>
    )}
  </>
);

const WalletSelectPopup: FC<Props> = ({
  balances,
  rates,
  selected,
  onSelect,
  onDepositClick,
  onSettingsClick,
  handleDropdownClick,
}) => {
  const { t } = useTranslation('main');
  const [hovered, setHovered] = useState<CoinType>(selected);
  const { bcCurrency } = useUser();
  const viewInFiatCurrency = useShallowSelector(selectViewInFiatCurrency);
  const cryptoCurrencies = useShallowSelector(selectCryptoCurrencies);
  const dispatch = useDispatch();
  const coins = useMemo(() => coinOrder.filter((coin) => cryptoCurrencies[coin]), [cryptoCurrencies]);

  const currencySymbol = CurrencySymbol[bcCurrency] ?? '$';

  const toggleWithRates = () => dispatch(setViewInFiatCurrency(!viewInFiatCurrency));

  return (
    <div className={styles.list}>
      <div className={styles.head}>
        <div>{t('Your coins')}</div>
        <Button
          color={ButtonColor.Primary}
          size={32}
          className={styles.deposit}
          type="button"
          onClick={onDepositClick}
        >
          {t('Deposit')}
        </Button>
      </div>

      <div
        className={styles.coins}
        onMouseOut={() => setHovered(selected)}
        onBlur={() => setHovered(selected)}
      >
        {coins.map((coin) => (
          <button
            className={classNames(styles.coin, {
              [styles.with_rate]: viewInFiatCurrency,
            })}
            onClick={() => {
              onSelect(coin);
              handleDropdownClick();
            }}
            onMouseOver={() => setHovered(coin)}
            onFocus={() => setHovered(coin)}
            key={coin}
          >
            <Row
              coin={coin}
              balance={balances[coin] || 0}
              rate={rates[coin] || 0}
              withRates={viewInFiatCurrency}
              currencySymbol={currencySymbol}
            />
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.settings}
          type="button"
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
            onSettingsClick();
          }}
        >
          <FontIcon name={FontIconName.Settings} size={16} />
        </button>
        <div className={styles.price}>
          <div className={styles.price_row}>
            {hovered ? (
              <>
                <span className={styles.gray}>
                  {t('{{coin}} price', { coin: hovered })}
                  {': '}
                </span>
                <span>
                  <span className={styles.currnecySymbol}>{currencySymbol}</span>
                  {hovered ? parseFloat(rates[hovered]?.toFixed(4) || '') : 0}
                </span>
              </>
            ) : (
              <span> </span>
            )}
          </div>
          <div className={styles.price_row}>
            <span className={styles.gray}>{t('View in')}</span>
            <span>{bcCurrency}</span>
            <span className={styles.toggle}>
              <Toggle value={viewInFiatCurrency} onChange={toggleWithRates} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { WalletSelectPopup };
