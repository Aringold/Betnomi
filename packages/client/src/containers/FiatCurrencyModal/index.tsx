import React, { useState } from 'react';
import Button from '@betnomi/libs/components/Button';

import { HocModal } from 'components/modal/HocModal';
import cx from 'classnames';
import { useModal } from 'hooks/useModal';
import { useShallowSelector } from 'hooks';
import { selectIsMobile } from 'store/global/selectors';
import { setBcCurrency } from 'store/auth/actionCreators';
import { useDispatch } from 'react-redux';
import { FiatSelector } from './FiatSelector';
import styles from './styles.module.scss';

export const FiatCurrencyModal: React.FC = () => {
  const { onCloseModal } = useModal();
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const isMobile = useShallowSelector(selectIsMobile);
  const dispatch = useDispatch();

  const setCurrency = () => {
    dispatch(setBcCurrency({ bcCurrency: selectedCurrency }));
    onCloseModal();
  };

  return (
    <HocModal
      title={<span className={styles.title}>Informations</span>}
    >
      <div className={styles.container}>
        <span className={styles.title}>
          Select and set a fiat currency for your account.
        </span>
        <span className={styles.contentText}>
          All transactions occur in their respective cryptocurrencies. The fiat
          currency is an approximation of your crypto balance, displayed only
          for your convenience.
          <br />
          <br />
          Please note, the fiat currency cannot be changed
          once it has been set.
        </span>
        <FiatSelector
          selectedCurrency={selectedCurrency}
          onSelectCurrency={setSelectedCurrency}
        />
        <Button
          className={cx(styles.setCurrencyButton,
            { [styles.disabledButton]: !selectedCurrency })}
          size={isMobile ? 44 : 52}
          disabled={!selectedCurrency}
          onClick={setCurrency}
        >
          Set Currency
        </Button>
      </div>
    </HocModal>
  );
};
