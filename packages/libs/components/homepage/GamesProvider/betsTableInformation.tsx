import React from 'react';
import cx from 'classnames';
import { Column } from 'react-table';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import Hidden from '@betnomi/libs/assets/img/hidden.svg';
import { FontIcon } from '@betnomi/libs/components/FontIcon';
import { formatNumber } from '../../../../client/src/utils/helpers';
import styles from './styles.module.scss';

interface IColumnData {
  gameName: string;
  userName: string;
  payoutValue: IBet;
}

interface Data {
  gameName: string;
  userName: string;
  bet: IBet;
  multiplier: number;
  payoutValue: IBet;
}
interface IBet {
  value: number;
  name: string;
}

// const checkBet = (bet: any) => {
//   const value = bet.toString();
//   const { length } = value;
//   if (length < 10) { return formatNumber(value, 8); }
//   if (length > 10) {
//     return formatNumber(value, 10);
//   }
//   return value;
// };

export const columns: Column<Data>[] = [
  {
    Header: 'Game',
    accessor: 'gameName',
    Cell: (game) => {
      const { value } = game;
      return (
        <div className={styles.gmaeFlex}>
          <FontIcon name="icon-casino" size={20} />
          <h3 className={styles.headingFootballer}>{value}</h3>
        </div>
      );
    },
  },
  {
    Header: 'User',
    accessor: 'userName',
    Cell: ({ value }) =>
      (value !== '' ? (
        <h3 className={styles.headingWhite}>{value}</h3>
      ) : (
        <div className={styles.gmaeFlex}>
          <img src={Hidden} alt="icon" className={styles.imgHidden} />
          <h3 className={styles.headingButton}>Hidden</h3>
        </div>
      )),
  },
  {
    Header: 'Bet',
    accessor: 'bet',
    Cell: ({ value }) => (
      <div className={styles.betDesctop}>
        <div>
          <h3 className={styles.headingButton}>{value.value ? formatNumber(String(value.value), 8) : '0.00000000'}</h3>
          <CoinImg imgData={value.name} className={styles.img} />
        </div>
      </div>
    ),
  },
  {
    Header: 'Multiplier',
    accessor: 'multiplier',
    Cell: ({ value }) => (
      <h3 className={styles.headingButton}>
        {`${value ? value.toFixed(2) : '0.00'}x`}
      </h3>
    ),
  },
  {
    Header: 'Payout',
    accessor: 'payoutValue',
    Cell: ({ value }) => (
      <div className={cx(styles.gmaeFlex, styles.noMarginRight)}>
        <h3
          className={
            value.value > 0 ? styles.headingBrand : styles.headingButton
          }
        >
          {formatNumber(String(value.value || 0), 10)}
        </h3>
        <CoinImg imgData={value.name} className={styles.img} />
      </div>
    ),
  },
];

export const columnsMobile: Column<IColumnData>[] = [
  {
    Header: 'Game',
    accessor: 'gameName',
    Cell: (game) => {
      const { value } = game;
      return (
        <div className={styles.gmaeMObile}>
          <FontIcon name="icon-casino" size={18} />
          <h3 className={styles.headingFootballer}>{value}</h3>
        </div>
      );
    },
  },
  {
    Header: 'Payout',
    accessor: 'payoutValue',
    Cell: ({ value }) => (
      <div className={styles.amountMobile}>
        <div>
          <h3
            className={
              value.value > 0 ? styles.headingBrand : styles.headingButton
            }
          >
            {formatNumber(String(value.value || 0), 10)}
          </h3>
          <CoinImg imgData={value.name} className={styles.img} />
        </div>
      </div>
    ),
  },
];

export const columnsMediumMobile: Column<IColumnData>[] = [
  {
    Header: 'Game',
    accessor: 'gameName',
    Cell: (game) => {
      const { value } = game;
      return (
        <div className={styles.gmaeMObile}>
          <FontIcon name="icon-casino" size={18} />
          <h3 className={styles.headingFootballer}>{value}</h3>
        </div>
      );
    },
  },
  {
    Header: 'User',
    accessor: 'userName',
    Cell: ({ value }) =>
      (value !== '' ? (
        <h3 className={styles.headingWhite}>{value}</h3>
      ) : (
        <div className={styles.gmaeMObile}>
          <div>
            <img src={Hidden} alt="icon" className={styles.imgHidden} />
            <h3 className={styles.headingButton}>Hidden</h3>
          </div>
        </div>
      )),
  },
  {
    Header: 'Payout',
    accessor: 'payoutValue',
    Cell: ({ value }) => (
      <div className={styles.amountMobile}>
        <div>
          <h3
            className={
              value.value > 0 ? styles.headingBrand : styles.headingButton
            }
          >
            {formatNumber(String(value.value || 0), 10)}
          </h3>
          <CoinImg imgData={value.name} className={styles.img} />
        </div>
      </div>
    ),
  },
];
