import React from 'react';

import { Deposit } from '../Deposit';
import { TransactionAllType } from '../../../../constants/transaction';

interface Props {
  isMobile: boolean
  type: TransactionAllType,
}

export const Withdraw:React.FC<Props> = ({ isMobile, type }) => (
  <Deposit isMobile={isMobile} type={type} />
);
