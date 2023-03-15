import React from 'react';

import { RadioButton } from '@betnomi/libs/components/Radio';

import { currencyWithSymbols } from 'constants/Currency';
import styles from './styles.module.scss';

interface FiatSelectorProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
}

export const FiatSelector: React.FC<FiatSelectorProps> = ({
  selectedCurrency,
  onSelectCurrency,
}) => (
  <div className={styles.selectorGrid}>
    {currencyWithSymbols.map((currency) => (
      <div className={styles.currencyLabel} key={currency.label}>
        <RadioButton
          isChecked={selectedCurrency === currency.label}
          onCheck={() => onSelectCurrency(currency.label)}
        />
        <span className={styles.label}>{currency.label}</span>
        <img src={currency.icon} alt={currency.label} />
      </div>
    ))}
  </div>
);
