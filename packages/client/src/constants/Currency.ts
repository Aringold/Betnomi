import usd from '@betnomi/libs/assets/img/currency/usd.svg';
import eur from '@betnomi/libs/assets/img/currency/eur.svg';
import inr from '@betnomi/libs/assets/img/currency/inr.svg';
import cad from '@betnomi/libs/assets/img/currency/cad.svg';
import gbp from '@betnomi/libs/assets/img/currency/gbp.svg';
import rub from '@betnomi/libs/assets/img/currency/rub.svg';
import brl from '@betnomi/libs/assets/img/currency/brl.svg';
import krw from '@betnomi/libs/assets/img/currency/krw.svg';
import jpy from '@betnomi/libs/assets/img/currency/jpy.svg';
import cny from '@betnomi/libs/assets/img/currency/cny.svg';

interface Currency {
  label: string;
  icon: string;
}

export const currencyWithSymbols: Currency[] = [
  { label: 'USD', icon: usd },
  { label: 'CAD', icon: cad },
  { label: 'RUB', icon: rub },
  { label: 'JPY', icon: jpy },
  { label: 'EUR', icon: eur },
  { label: 'GBP', icon: gbp },
  { label: 'BRL', icon: brl },
  { label: 'CNY', icon: cny },
  { label: 'INR', icon: inr },
  { label: 'KRW', icon: krw },
];
