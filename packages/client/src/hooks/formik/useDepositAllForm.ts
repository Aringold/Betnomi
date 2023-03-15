import { useEffect } from 'react';
import { object, string } from 'yup';
import { FormikConfig, useFormik } from 'formik';
import { CoinType, CoinWithAllType, WithALLCoinOrder } from '@betnomi/libs/types';
import { TransactionAllStatus, TransactionAllType, TimeRangeType } from '../../constants/transaction';
import { useTranslation } from '../../i18n';
import { TetherSubTypes } from '../../constants/withdraw';
import { useShallowSelector } from '../index';
import { selectProfileDepositAll } from '../../store/profile/selectors';

type Config = FormikConfig<DepositAllFormikValues>;

const blockChair = 'https://blockchair.com';
const etherScan = 'https://etherscan.io';
const bscScan = 'https://bscscan.com';
const xrpScan = 'https://xrpscan.com';
const tronScan = 'https://tronscan.org/#';

export interface DepositAllFormikValues {
  fromDate: string;
  toDate: string;
  limit: number,
  offset: number,
  time: { label: string, value: TimeRangeType }
  transactionTypes: { label: string, value: TransactionAllType }
  resultTypes: { label: string, value: TransactionAllStatus }
  currency: CoinWithAllType,
  txId: string,
}

export const initialValues = (type: TransactionAllType): DepositAllFormikValues => ({
  fromDate: '',
  toDate: '',
  limit: 10,
  offset: 0,
  time: {
    label: '24 hours',
    value: TimeRangeType.oneDay,
  },
  transactionTypes: {
    label: type,
    value: TransactionAllType[type],
  },
  resultTypes: {
    label: 'All',
    value: TransactionAllStatus.AllResults,
  },
  currency: WithALLCoinOrder[0],
  txId: '',
});

export interface USDTSubTypesProps {
  txId: string,
  url: string,
  address: string,
}

export const USDTSubTypes: Record<string, USDTSubTypesProps> = {
  [TetherSubTypes.USDT]: {
    txId: 'tx',
    address: 'address',
    url: etherScan,
  },
  [TetherSubTypes.TRX]: {
    txId: 'transaction',
    address: 'address',
    url: tronScan,
  },
  [TetherSubTypes.BNB]: {
    txId: 'tx',
    address: 'address',
    url: bscScan,
  },
};

export interface LinksProps {
  url: string,
  txId: string,
  address: string,
  name: string,
}

export const Links: Record<any, LinksProps> = {
  [CoinType.ethereum]: {
    url: etherScan,
    txId: 'tx',
    address: 'address',
    name: '',
  },
  [CoinType.binancecoin]: {
    url: bscScan,
    txId: 'tx',
    address: 'address',
    name: '',
  },
  [CoinType.bitcoin]: {
    url: blockChair,
    txId: 'transaction',
    address: 'address',
    name: 'bitcoin',
  },
  [CoinType.bitcoincash]: {
    url: blockChair,
    txId: 'transaction',
    address: 'address',
    name: 'bitcoin-cash',
  },
  [CoinType.doge]: {
    url: blockChair,
    txId: 'transaction',
    address: 'address',
    name: 'dogecoin',
  },
  [CoinType.litecoin]: {
    url: blockChair,
    txId: 'transaction',
    address: 'address',
    name: 'litecoin',
  },
  [CoinType.ripple]: {
    url: xrpScan,
    txId: 'tx',
    address: 'account',
    name: '',
  },
  [CoinType.tether]: {
    url: etherScan,
    txId: 'tx',
    address: 'address',
    name: '',
  },
  [CoinType.tron]: {
    url: tronScan,
    txId: 'transaction',
    address: 'address',
    name: '',
  },
};

const validationSchema = object().shape({
  fromDate: string(),
});

export const useDepositAllFormik = (
  onSubmit: Config['onSubmit'] = () => {},
  type: TransactionAllType,
) => {
  const { t } = useTranslation('profile');

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: initialValues(type),
  });

  const {
    toDate, fromDate,
  } = useShallowSelector(selectProfileDepositAll);

  useEffect(() => {
    formik.setFieldValue('fromDate', fromDate);
    formik.setFieldValue('toDate', toDate);
  }, [fromDate, toDate]);

  const optionsTransactionType = [
    { label: t('All'), value: TransactionAllType.All },
    { label: t('Bet'), value: TransactionAllType.Bet },
    { label: t('Bet and Win'), value: TransactionAllType.BetAndWin },
    { label: t('Bonus'), value: TransactionAllType.Bonus },
    { label: t('RollBack'), value: TransactionAllType.Rollback },
    { label: t('Win'), value: TransactionAllType.Win },
  ];

  const optionsResultType = [
    { label: t('All'), value: TransactionAllStatus.AllResults },
    { label: t('Canceled'), value: TransactionAllStatus.Canceled },
    { label: t('Completed'), value: TransactionAllStatus.Completed },
    { label: t('Pending'), value: TransactionAllStatus.Pending },
  ];

  const optionsTimeType = [
    { label: t('24 hours'), value: TimeRangeType.oneDay },
    { label: t('48 hours'), value: TimeRangeType.twoDay },
    { label: t('72 hours'), value: TimeRangeType.threeDay },
    { label: t('Customize'), value: TimeRangeType.custom },
  ];

  return {
    formik,
    optionsTransactionType,
    optionsResultType,
    optionsTimeType,
  };
};
