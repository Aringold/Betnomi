import { FormikHelpers, useFormik } from 'formik';
import {
  useCallback,
  useEffect, useMemo,
  useRef,
  useState,
} from 'react';
import { number, object, string } from 'yup';
import { coinOrder, CoinType } from '@betnomi/libs/types';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useDispatch } from 'react-redux';
import { useUser } from '../useUser';
import { profileSetWithdraw } from '../../store/profile/actionCreators';
import { modalShow } from '../../store/modal/actionCreators';
import { ModalType } from '../../store/modal/types';
import { useWithdrawPreCheck, WithdrawPreCheckStateTypes } from '../money/useWithdrawPreCheck';
import { withdrawPairsByPreCheck } from '../../constants/withdraw';
import useShallowSelector from '../useShallowSelector';
import { selectRateFromUSD } from '../../store/rates/selectors';

export interface ProfileWithdrawFormikValues {
  coin: CoinType
  amount?: number
  address: string
  destTag?: string
  network?: CoinType
}

export const profileWithdrawInitialValues: ProfileWithdrawFormikValues = {
  coin: coinOrder[0],
  amount: undefined,
  address: '',
  destTag: '',
  network: undefined,
};

const validationSchema = object().shape({
  coin: string().required(),
  amount: number().required().positive(),
  address: string().required(),
  destTag: string(),
});

export const useProfileWithdrawFormik = (
  values: ProfileWithdrawFormikValues = profileWithdrawInitialValues,
) => {
  const { showErrorToast, hideToast } = useToasts();
  const dispatch = useDispatch();
  const rates = useShallowSelector(selectRateFromUSD);

  const getRate = useCallback((currency: CoinType) => rates[currency] || 0, [
    rates,
  ]);

  const fromUSD = useCallback(
    (currency: CoinType) => (minWithdraw: number) =>
      (getRate(currency) ? minWithdraw / getRate(currency) : 0),
    [rates],
  );

  const initialValues = useRef(values);
  const [preCheck, setPreCheck] = useState<WithdrawPreCheckStateTypes>();
  const { balances } = useUser();

  const onSubmit = useCallback(
    (
      vals: ProfileWithdrawFormikValues,
      { setSubmitting }: FormikHelpers<ProfileWithdrawFormikValues>,
    ) => {
      const email = 'test_email_22@betnomi.me';

      dispatch(profileSetWithdraw({ ...vals, email }));
      dispatch(modalShow(ModalType.WithdrawalConfirm));
      setSubmitting(false);
    }, [dispatch, showErrorToast, hideToast],
  );

  const formik = useFormik<ProfileWithdrawFormikValues>({
    initialValues: initialValues.current,
    validationSchema,
    onSubmit,
  });

  const balance = balances[formik.values.coin]!;
  const total = formik.values.amount || 0;

  const targets = useMemo(() => formik.values.network && withdrawPairsByPreCheck[formik.values.network], [formik.values.network]);

  const {
    minWithdraw,
    totalWithdrawnIn24h,
    globalLimitInUsd,
    totalWithdrawalIn24h,
  } = useWithdrawPreCheck(targets ?? formik.values.coin);

  const limit = fromUSD(formik.values.coin)((preCheck?.maxWithdraw ? preCheck?.maxWithdraw : preCheck?.globalLimitInUsd) || 0);
  const limitLeft = fromUSD(formik.values.coin)(preCheck?.totalWithdrawnIn24h || 0);
  const fee = 0;

  useEffect(() => {
    formik.setFieldValue('network', undefined);
    formik.setFieldValue('amount', undefined);
    formik.validateForm();
  }, [formik.values.coin]);

  useEffect(() => {
    setPreCheck({
      globalLimitInUsd,
      totalWithdrawalIn24h,
      currency: formik.values.coin,
      maxWithdraw: 0,
      minWithdraw,
      totalWithdrawnIn24h,
    });
  }, [formik.values.coin, targets, minWithdraw]);

  return {
    formik,
    balance,
    limit,
    limitLeft,
    preCheck,
    fee,
    total,
  };
};
