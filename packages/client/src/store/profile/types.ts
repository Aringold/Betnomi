import { CoinType } from '@betnomi/libs/types';
import { BetType, BetResult } from '../../constants/BetResult';
import { TransactionAllStatus, TransactionAllType } from '../../constants/transaction';
import { WithdrawConfirmValues } from '../../hooks/formik/useWithdrawConfirmFormik';

export interface ProfileKYCCreateRequest {
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: string;
  address: string;
  city: string;
  country: string;
  region: string;
  zipCode: string;
}

export type WithdrawErrorTransformResult = {
  message: string;
  fields?: { [key in keyof WithdrawConfirmValues]?: string };
};

export interface WithdrawRequest {
  currency: string;
  wallet: string;
  amount: number;
  emailCode: string;
  googleCode: string;
  destTag?: string;
}

export enum KYCFileType {
  ProofOfAddress = 'proofOfAddress',
  SourceOfFunds = 'sourceOfFunds',
  ProofOfIdentityBack = 'proofOfIdentityBack',
  ProofOfIdentityFront = 'proofOfIdentityFront',
}

export interface KYCFileUploadResponse {
  userId: string;
  filePath: string;
}

export type TransactionAllItem = {
  amount: number;
  createdAt: string;
  currency: CoinType;
  finalAmount: number;
  id: string;
  product: string;
  displayCurrency?: string,
  finalAmountFiat: number,
  displayAmount: number,
  resultType: TransactionAllStatus;
  transactionType: TransactionAllType;
  transferDetails?: {
    description: string,
    fromUsername: string,
    message: string,
    toUsername: string,
  }
};

export type TransactionAllList = TransactionAllItem[] | undefined;

export type DepositAllItem = {
  id: string;
  createdAt: string;
  currency: CoinType;
  amount: number;
  resultType: TransactionAllStatus;
  withdrawDepositDetail?: {
    addr: string,
    tx: string,
    chain: string;
  }
};

export type DepositAllList = DepositAllItem[] | undefined;

export type DepositAllListResponse = {
  total: number;
  list: DepositAllList;
};

export type TransactionAllResponse = {
  total: number;
  list: TransactionAllList;
};

export type TransactionAllRequest = {
  limit: number,
  offset: number,
  toDate: number;
  fromDate: number;
  currency?: string;
  transactionTypes: TransactionAllType[];
  resultTypes: TransactionAllStatus[];
};

export type DepositAllRequest = {
  limit: number,
  offset: number,
  toDate: number;
  fromDate: number;
  currency?: string;
  txId?: string;
  transactionTypes: TransactionAllType[];
  resultTypes: TransactionAllStatus[];
};

export type SportsBetItem = {
  amount: number;
  createdAt: string;
  currency: CoinType;
  finalAmount: number;
  id: string;
  product: string;
  resultType: BetResult;
  transactionType: BetType;
};

export type SportsBetList = SportsBetItem[] | undefined;
