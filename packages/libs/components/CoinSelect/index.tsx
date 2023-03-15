import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, useEffect, useRef,
} from 'react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import {
  coinNames,
  coinOrder, CoinType,
  WithALLCoinOrder,
} from '@betnomi/libs/types/ui';
import { usePopperToggle } from '@betnomi/libs/hooks/usePopperToggle';
import { usePopperDropdown } from '@betnomi/libs/hooks/ui/usePopperDropdown';

import { TextInputWrap } from '../TextInputWrap';
import { FontIcon, FontIconName } from '../FontIcon';
import Coin from '../Coin';

import styles from './styles.module.scss';

interface IProps<T = CoinType>{
  selected: T;
  onSelect: (val: T) => void;
  disabled?: boolean;
  withName?: boolean;
  withLine?: boolean;
  className?: string;
  withAll?: boolean;
  exception?: string;
}

interface RowProps<T = CoinType> extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  coin: T;
  withName?: boolean;
  withLine?: boolean;
  className?: string;
  withAll?: boolean;
}

const isCoinType = <T extends unknown>(coin: CoinType | T): coin is CoinType => coin !== 'ALL';

const Row = <T extends string>({
  coin, withName, withLine, withAll, ...props
}: RowProps<T>) => (
  <button className={styles.button} {...props} type="button">
    <div className={styles.icon}>
      {
        isCoinType(coin) ? (
          <>
            <Coin coin={coin} size={16} />
            {withLine && <div className={styles.line} />}
          </>
        ) : (coin)
      }

    </div>
    {
      isCoinType(coin) && (
        <div className={styles.name}>{coinNames[coin]}</div>
      )
    }

    {withName && <div className={styles.type}>{isCoinType(coin) && coin}</div>}
  </button>
  );

const CoinSelect = <T extends string>({
  selected,
  onSelect,
  disabled,
  withName,
  withLine,
  className,
  withAll,
  exception,
}: IProps<T>) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef(null);

  const { visible, handleDocumentClick, handleDropdownClick } = usePopperToggle(btnRef);
  const modify = usePopperDropdown(0, 10, true);

  const popperProps = usePopper(btnRef.current, popperRef.current, {
    placement: 'bottom-start',
    modifiers: modify,
  });

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <TextInputWrap className={className}>
        <div className={classNames(styles.select)} ref={btnRef}>
          <Row<T>
            coin={selected}
            onClick={() => {
              if (popperProps.update) {
                popperProps.update();
              }
              handleDropdownClick();
            }}
            disabled={disabled}
            withName={withName}
            withLine={withLine}
          />
          <button 
            className={styles.icon} 
            onClick={() => {
              if (popperProps.update) {
                popperProps.update();
              }
              handleDropdownClick();
            }}
            disabled={disabled} 
            type="button"
          >
            <FontIcon name={FontIconName.IconArrowBottom} size={16} />
          </button>
        </div>
      </TextInputWrap>

      <div 
        className={classNames(styles.float, { [styles.hidden]: !visible })} 
        ref={popperRef}
        style={popperProps.styles.popper} 
        {...popperProps.attributes.popper}
      >
        <div className={styles.list}>
          {(withAll ? WithALLCoinOrder as T[] : coinOrder as T[])
            .filter((coin) => (coin !== selected && (coin !== exception)))
            .map((coin) => (
              <Row<T>
                withAll={withAll}
                coin={coin}
                onMouseDown={() => {
                  onSelect(coin);
                  handleDropdownClick();
                }} 
                key={coin}
                withName={withName}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export { CoinSelect };
