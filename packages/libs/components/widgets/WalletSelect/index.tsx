/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useEffect, useMemo, useRef, useState, 
} from 'react';
import { useHistory } from 'react-router-dom';
import { keys } from 'ramda';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import { HeaderToggleButton } from '@betnomi/client/src/components/layout/HeaderToggleButton';
import { useUser } from '@betnomi/client/src/hooks/useUser';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectViewInFiatCurrency } from '@betnomi/client/src/store/settings/selectors';
import { CurrencySymbol } from '../../../utils/currency';
import { CoinType } from '../../../types';
import Coin from '../../Coin';
import { FontIcon, FontIconName } from '../../FontIcon';
import styles from './styles.module.scss';
import { PopperArrow } from '../../PopperArrow';
import { WalletSelectPopup } from '../WalletSelectPopup';
import { Balance } from '../../Balance';

export interface WalletSelectProps {
  balances: Partial<Record<CoinType, number>>;
  rates: Partial<Record<CoinType, number>>;
  selected: CoinType;
  onChange: (val: CoinType) => void;
  onDepositClick: () => void;
  onSettingsClick: () => void;
}

const WalletSelect: FC<WalletSelectProps> = ({
  balances,
  selected,
  rates,
  onChange,
  onDepositClick,
  onSettingsClick,
}) => {
  const history = useHistory();

  const [visible, setVisibility] = useState(false);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const viewInFiatCurrency = useShallowSelector(selectViewInFiatCurrency);

  const btnRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef(null);

  const popperProps = usePopper(btnRef.current, popperRef.current, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'arrow',
        enabled: true,
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 25],
        },
      },
    ],
  });

  const { bcCurrency } = useUser();

  const currencySymbol = CurrencySymbol[bcCurrency] ?? '$';

  function handleDocumentClick(event: MouseEvent) {
    if (btnRef.current == null || (btnRef.current).contains(event.target as Node)) {
      return;
    }
    setVisibility(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function handleDropdownClick() {
    setVisibility(!visible);
  }

  const selectedCoin = useMemo(
    () => (keys(balances).includes(selected) ? selected : ''),
    [selected, balances],
  );
  
  const balance = useMemo(() => {
    if (viewInFiatCurrency) {
      return (rates[selected] || 0) * (balances[selected] || 0);
    }
    
    return balances[selected] || 0;
  }, [balances, rates, viewInFiatCurrency, selected]);

  return (
    <div className={styles.wrap}>
      <div className={styles.manager}>
        <button
          className={styles.widget}
          onClick={handleDropdownClick}
          ref={btnRef}
        >
          <div className={styles.selected}>
            {!!selectedCoin && <Coin coin={selected} size={16} />}

            <span>{selectedCoin}</span>

            <FontIcon name={FontIconName.IconArrowBottom} size={12} />
          </div>
          <div className={styles.balance}>
            {viewInFiatCurrency && (<span>{currencySymbol}</span>)}
            <Balance value={balance} precision={6} />
          </div>
        </button>

        <div
          className={classNames(styles.floating, {
            [styles.hidden]: !visible || keys(balances).length === 0,
          })}
          ref={popperRef}
          onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
          style={popperProps.styles.popper}
          {...popperProps.attributes.popper}
        >
          <PopperArrow props={{ ref: setArrowElement, style: popperProps.styles.arrow }} />
          <WalletSelectPopup
            onSelect={onChange}
            balances={balances}
            rates={rates}
            selected={selected}
            onDepositClick={onDepositClick}
            onSettingsClick={onSettingsClick}
            handleDropdownClick={handleDropdownClick}
          />
        </div>
      </div>

      <HeaderToggleButton
        onClick={() => { history.push('/profile/wallet'); }}
        icon={FontIconName.Wallet}
        className={styles.wallet}
      />
    </div>
  );
};

export { WalletSelect };
