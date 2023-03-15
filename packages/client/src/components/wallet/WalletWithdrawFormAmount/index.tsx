import React, { ChangeEventHandler, FC, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { WithdrawAmountInput } from '@betnomi/libs/components/WithdrawAmountInput';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Button } from '@betnomi/libs/components';
import { CoinType } from '@betnomi/libs/types';
import styles from '../WalletWithdrawForm/styles.module.scss';
import { useTranslation } from '../../../i18n';
import { WithdrawPreCheckStateTypes } from '../../../hooks/money/useWithdrawPreCheck';
import { formatNumber, truncate } from '../../../utils/helpers';
import useShallowSelector from '../../../hooks/useShallowSelector';
import { selectRateFromUSD } from '../../../store/rates/selectors';

interface Props {
  balance: number;
  coin: CoinType;
  amount?: number;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  limit: number;
  limitLeft: number;
  total: number;
  fee: number;
  precision?: number;
  isLoading: boolean;
  isValid: boolean;
  preCheck?: WithdrawPreCheckStateTypes;
  targetCoin?: CoinType;
}

const WalletWithdrawFormAmount: FC<Props> = ({
  total,
  balance,
  coin,
  amount,
  errors,
  touched,
  limit,
  limitLeft,
  fee,
  precision = 8,
  isLoading,
  onChangeAmount,
  isValid,
  preCheck,
  targetCoin,
}) => {
  const { t } = useTranslation('profile');
  const rates = useShallowSelector(selectRateFromUSD);

  const getRate = useCallback((currency: CoinType) => rates[currency] || 0, [
    rates,
  ]);

  const fromUSD = useCallback(
    (currency: CoinType) => (minWithdraw: number) =>
      (getRate(currency) ? minWithdraw / getRate(currency) : 0),
    [rates],
  );

  const minWithdraw = fromUSD(coin)(preCheck?.minWithdraw || 0);

  return (
    <>
      <hr className={styles.mobile_margin} />

      <div className={classNames(styles.label, styles.mobile_direction)}>
        <p className={styles.mobile_label_margin}>{t('Withdraw amount')}</p>
        <span className={classNames(styles.right)}>
          <span className={styles.white}>{`${truncate(String(balance), 6)} ${coin} `}</span>
          {t('available')}
        </span>
      </div>

      <WithdrawAmountInput
        amount={amount}
        max={balance}
        onChangeAmount={onChangeAmount}
        coin={coin}
        hasError={!!(errors.amount && touched.amount)}
        disabled={isLoading}
        placeholder={`Minimum: ${formatNumber(String(minWithdraw), precision)}`}
      />

      <div className={styles.label}>
        <span className={classNames(styles.right, styles.mobile_direction)}>
          <span className={styles.white}>
            {`${formatNumber(String(limitLeft), precision)} ${targetCoin ?? coin} / ${formatNumber(String(limit), precision)} ${targetCoin ?? coin} `}
          </span>
          <span>{t('24h remaining')}</span>
          <span data-tip data-for="availableInfo">
            <FontIcon name={FontIconName.Info} size={16} />
          </span>
          <ReactTooltip className={styles.infoTooltip} id="availableInfo" type="dark" effect="solid">
            {t('Withdrawals above your 24 hours limit require a review before processing. Otherwise, they are processed instantly. Contact us for a limit increase.')}
          </ReactTooltip>
        </span>
      </div>

      <hr className={styles.mobile_margin} />

      <div className={styles.label}>{t('Receive amount')}</div>

      <div className={classNames(styles.footer, styles.mobile_direction)}>
        <div className={styles.total}>
          {`${truncate(String(total), precision)} ${coin}`}

          <div className={styles.fee}>
            {t('{{fee}} {{coin}} network fee included', { fee, coin })}
            <span data-tip data-for="feeInfo">
              <FontIcon name={FontIconName.Info} size={16} />
            </span>
            <ReactTooltip className={styles.infoTooltip} id="feeInfo" type="dark" effect="solid">
              {t('The network/miner fee is an estimate for your convenience. The actual transaction fee will be debited by the blockchain from your withdrawal amount.')}
            </ReactTooltip>
          </div>
        </div>

        <Button
          type="submit"
          size={52}
          isLoading={isLoading}
          disabled={!isValid}
          className={styles.mobile_width}
        >
          {t('Withdraw')}
        </Button>
      </div>
    </>
  );
};

export { WalletWithdrawFormAmount };
