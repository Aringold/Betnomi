import { RefObject, useEffect } from 'react';

import WAValidator from 'multicoin-address-validator';
import { coinNames, CoinType } from '@betnomi/libs/types';
import { ChatMessage } from '@betnomi/libs/types/chat';

export const formatNumber = (num: string, fixCount: number) => {
  const fixed =
    fixCount !== undefined ? num.indexOf('.') !== -1 ? num.indexOf('.') : num.length : fixCount;

  return parseFloat(num).toFixed(fixed > fixCount ? fixCount : fixCount - Number(fixed));
};

export const truncate = (number: string, index = 2) => {
  const fixed =
    index !== undefined ? number.indexOf('.') !== -1 ? number.indexOf('.') : number.length : index;
  const fixCount = fixed > index ? index : index - Number(fixed);
  // eslint-disable-next-line no-restricted-properties
  return (Math.floor(Number(number) * Math.pow(10, fixCount)) / Math.pow(10, fixCount)).toFixed(fixCount);
};

export const multiCoinAddressValidator = (data: string, bcCurrency: CoinType) => {
  let currency;
  let messageAddress = '';
  let isValidAddress;

  switch (bcCurrency) {
    case CoinType.trc20:
      currency = CoinType.tron;
      break;
    case CoinType.erc20:
      currency = CoinType.tether;
      break;
    case CoinType.bep20:
      currency = CoinType.ethereum;
      break;
    case CoinType.binancecoin:
      currency = CoinType.ethereum;
      break;
    default:
      currency = bcCurrency;
  }

  if (WAValidator.findCurrency(currency)) {
    if (WAValidator.validate(data, currency)) {
      messageAddress = 'This is a valid address';
      isValidAddress = true;
    } else {
      messageAddress = `Invalid ${coinNames[bcCurrency]} Address, please check your address`;
      isValidAddress = false;
    }
  } else {
    console.error('Currency INVALID');
    isValidAddress = false;
  }

  return {
    messageAddress,
    isValidAddress,
  };
};

type AnyEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement> (
  ref: RefObject<T> | undefined,
  handler: (event: AnyEvent) => void,
): void => {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const isMessageGif = (message: ChatMessage) => (message.file_name.startsWith('https://media'));
