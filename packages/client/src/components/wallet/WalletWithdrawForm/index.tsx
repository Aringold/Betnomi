/* eslint-disable max-len */
import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler, useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { CoinSelect } from '@betnomi/libs/components/CoinSelect';
import { CoinType } from '@betnomi/libs/types';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { showErrorToast } from '@betnomi/libs/components/Toaster';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '../../../i18n';
import { withdrawPairs } from '../../../constants/withdraw';
import { WalletWithdrawFormAmount } from '../WalletWithdrawFormAmount';
import { WalletSelectNetwork } from '../WalletSelectNetwork';
import { multiCoinAddressValidator } from '../../../utils/helpers';
import { WithdrawPreCheckStateTypes } from '../../../hooks/money/useWithdrawPreCheck';
import styles from './styles.module.scss';
import useShallowSelector from '../../../hooks/useShallowSelector';
import { selectRateFromUSD } from '../../../store/rates/selectors';

interface Props {
  coin: CoinType;
  targetCoin?: CoinType;
  balance: number;
  limit: number;
  limitLeft: number;
  total: number;
  fee: number;
  errors: Record<any, any>;
  touched: Record<any, any>;
  address: string;
  tag?: string;
  amount?: number;
  isLoading: boolean;

  onChangeCoin: (val: CoinType) => void;
  onChangeNetwork: (val: CoinType) => void;
  onChangeAddress: ChangeEventHandler<HTMLInputElement>;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  onChangeTag?: ChangeEventHandler<HTMLInputElement>;
  onTouchTag?: (e: any) => void;
  onTouchAddress: (e: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>
  preCheck?: WithdrawPreCheckStateTypes;
}

const WalletWithdrawForm: FC<Props> = ({
  coin,
  tag,
  targetCoin,
  balance,
  limit,
  limitLeft,
  total,
  fee,
  errors,
  touched,
  address,
  amount,
  isLoading,
  onChangeCoin,
  onTouchAddress,
  onTouchTag,
  onChangeTag,
  onChangeAddress,
  onChangeAmount,
  onChangeNetwork,
  preCheck,
  onSubmit,
}) => {
  const { t } = useTranslation('profile');
  const targets = useMemo(() => withdrawPairs[coin], [coin]);
  const rates = useShallowSelector(selectRateFromUSD);

  const getRate = useCallback((currency: CoinType) => rates[currency] || 0, [
    rates,
  ]);

  const fromUSD = useCallback(
    (currency: CoinType) => (minWithdraw: number) =>
      (getRate(currency) ? minWithdraw / getRate(currency) : 0),
    [rates],
  );

  const [isValid, setIsValid] = useState(false);

  const minWithdraw = useMemo(() => fromUSD(coin)(preCheck?.minWithdraw || 0), [coin, preCheck]);

  const {
    messageAddress,
    isValidAddress,
  } = useMemo(() => multiCoinAddressValidator(address, targetCoin ?? coin), [address, coin, targetCoin]);

  useEffect(() => {
    if (!isValidAddress && address !== '') {
      showErrorToast(t(messageAddress), t('Warning'));
      setIsValid(false);
    } else if (total && total < Number(minWithdraw)) {
      setIsValid(false);
    } else if (total !== 0 && total > balance) {
      showErrorToast(t('Insufficient funds, You cannot withdraw more than you have.'), t('Warning'));
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [address, coin, targetCoin, total]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={cx(styles.label)}>{t('Select Coin')}</div>
      <CoinSelect className={cx(styles.mobile_margin, styles.background)} selected={coin} onSelect={onChangeCoin} withName disabled={isLoading} exception={CoinType.sbni} withLine />
      <div className={cx(styles.label)}>{t('Withdraw to')}</div>
      <TextInput
        placeholder="Address"
        value={address}
        onChange={onChangeAddress}
        onBlur={onTouchAddress}
        hasError={!!(errors.address && touched.address) && !isValidAddress}
        disabled={isLoading}
        className={cx(styles.mobile_margin, styles.background)}
      />
      {
        coin === CoinType.ripple && (
          <>
            <TextInput
              placeholder="Destination Tag"
              value={tag}
              onChange={onChangeTag}
              onBlur={onTouchTag}
              disabled={isLoading}
              right={(
                <span data-tip data-for="DestinationTagInfo">
                  <FontIcon name={FontIconName.Info} size={16} />
                </span>
              )}
              className={cx(styles.mobile_margin, styles.background)}
            />
            <ReactTooltip className={styles.infoTooltip} id="DestinationTagInfo" type="dark" effect="solid">
              Please include the destination tag if it`s required by your wallet.
              Else, your coins will be lost and cannot be recovered.
            </ReactTooltip>
          </>
        )
      }
      {!!targets && (
        <WalletSelectNetwork
          coins={targets}
          selected={targetCoin}
          onSelect={onChangeNetwork}
          disabled={isLoading}
          className={cx(styles.custom_background, styles.mobile_margin)}
        />
      )}

      {!targets || targetCoin ? (
        <WalletWithdrawFormAmount
          total={total}
          balance={balance}
          coin={coin}
          amount={amount}
          errors={errors}
          touched={touched}
          limit={limit}
          limitLeft={limitLeft}
          isValid={isValid}
          fee={fee}
          targetCoin={targetCoin}
          onChangeAmount={onChangeAmount}
          isLoading={isLoading}
          preCheck={preCheck}
        />
      ) : null}
    </form>
  );
};

export { WalletWithdrawForm };
