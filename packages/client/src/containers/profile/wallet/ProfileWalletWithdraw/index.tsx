import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WalletWithdrawForm } from '../../../../components/wallet/WalletWithdrawForm';
import { useProfileWithdrawFormik } from '../../../../hooks/formik/useProfileWithdrawFormik';
import { ratesGetFormUSD } from '../../../../store/rates/actionCreators';
import styles from './styles.module.scss';

interface Props {}

const ProfileWalletWithdraw: FC<Props> = () => {
  const {
    formik: {
      values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
    },
    balance,
    limit,
    limitLeft,
    total,
    fee,
    preCheck,
  } = useProfileWithdrawFormik();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ratesGetFormUSD());
  }, []);

  return (
    <div className={styles.form}>
      <WalletWithdrawForm
        coin={values.coin}
        balance={balance}
        limit={limit}
        limitLeft={limitLeft}
        total={total}
        amount={values.amount}
        fee={fee}
        errors={errors}
        touched={touched}
        tag={values.destTag}
        address={values.address}
        targetCoin={values.network}
        preCheck={preCheck}
        isLoading={isSubmitting}
        onChangeCoin={handleChange('coin')}
        onChangeNetwork={handleChange('network')}
        onChangeAddress={handleChange('address')}
        onChangeAmount={handleChange('amount')}
        onChangeTag={handleChange('destTag')}
        onTouchTag={handleBlur('destTag')}
        onTouchAddress={handleBlur('address')}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { ProfileWalletWithdraw };
