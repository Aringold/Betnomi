import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import { CoinType } from '@betnomi/libs/types';
import { ProfileKYCBasicFormikValues } from '../../hooks/formik/useProfileKYCBasicForm';
import {
  KYCFileType, TransactionAllList, DepositAllList, SportsBetList,
} from '../../store/profile/types';

interface BasicState extends ProfileKYCBasicFormikValues {
  isLoaded: boolean
}

export interface ProfileFileState {
  name: string,
  contentType: string,
  fileSize: string,
  status: FileStatus
}

export interface ProfileState {
  basic: BasicState
  advanced: {
    isLoaded: boolean,
    isLoading: boolean,
    [KYCFileType.SourceOfFunds]: ProfileFileState,
    [KYCFileType.ProofOfAddress]: ProfileFileState,
  },
  intermediate: {
    isLoaded: boolean,
    isLoading: boolean,
    [KYCFileType.ProofOfIdentityFront]: ProfileFileState,
    [KYCFileType.ProofOfIdentityBack]: ProfileFileState,
  },
  withdraw: {
    isLoading: boolean;
    coin: CoinType;
    amount: number;
    network?: CoinType;
    fee: number;
    address: string;
    email: string;
    destTag?: string;
  }
  transactionAll: {
    isLoading: boolean,
    total: number,
    limit: number,
    offset: number,
    list: TransactionAllList,
    fromDate?: number,
    toDate?: number,
  },
  depositAll: {
    isLoading: boolean,
    total: number,
    offset: number,
    limit: number,
    list: DepositAllList,
    fromDate?: number,
    toDate?: number,
    depositDetail: any
  },
  sportsBet: {
    isLoading: boolean,
    total: number,
    list: SportsBetList,
    fromDate?: number,
    toDate?: number,
  },
}

export interface ProfileKYCBasicError {
  message: string
  fields?: { [key in keyof ProfileKYCBasicFormikValues]?: string }
}

export interface ProfileKYCAdvancedError {
  message?: string
  fields?: { [key in KYCFileType]?: string }
}
