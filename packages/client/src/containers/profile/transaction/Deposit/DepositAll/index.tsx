import React, { useCallback, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import { ModalType } from 'store/modal/types';
import { TimeRangeType, TransactionAllType } from 'constants/transaction';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { Option } from '@betnomi/libs/components/Select';
import {
  profileGetDepositAll,
  profileSetDepositAll,
} from '@betnomi/client/src/store/profile/actionCreators';
import { useModal } from '@betnomi/client/src/hooks/useModal';
import { selectProfileDepositAll } from '@betnomi/client/src/store/profile/selectors';
import { DepositAllFormikValues, initialValues, useDepositAllFormik } from '@betnomi/client/src/hooks/formik/useDepositAllForm';
import { DepositAllForm } from '../DepositAllForm';

type Props = {
  ClassName?: string;
  type: TransactionAllType;
};

export const DepositAll: React.FC<Props> = ({ ClassName, type }) => {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');

  const { isLoading } = useShallowSelector(selectProfileDepositAll);

  const onSearch = useCallback((data: DepositAllFormikValues) => {
    dispatch(profileGetDepositAll(data));
  }, []);

  const {
    formik: {
      values, handleSubmit, setFieldValue, handleChange,
    },
    optionsResultType,
    optionsTimeType,
  } = useDepositAllFormik(onSearch, type);

  const prevFormValues = useRef(values);

  useEffect(() => {
    dispatch(profileGetDepositAll(initialValues(type)));
  }, []);

  useEffect(() => {
    if (!isEqual(prevFormValues.current, values)) {
      dispatch(profileGetDepositAll(values));
    }

    prevFormValues.current = values;
  }, [values]);

  const onResultChange = useCallback((item:Option<string>) => {
    setFieldValue('resultTypes', item);
  }, [setFieldValue]);

  const onTimeChange = useCallback((item:Option<string>) => {
    setFieldValue('time', item);
    const milliseconds = 24 * 60 * 60 * 1000;
    const day = new Date().getTime();

    if (item?.value === TimeRangeType.custom) {
      return showModal(ModalType.SelectDateDeposit)();
    }

    if (item?.value === TimeRangeType.oneDay) {
      const oneDay = day - milliseconds;
      return dispatch(profileSetDepositAll({ fromDate: oneDay }));
    }

    if (item?.value === TimeRangeType.twoDay) {
      const twoDay = day - 2 * milliseconds;
      return dispatch(profileSetDepositAll({ fromDate: twoDay }));
    }

    if (item?.value === TimeRangeType.threeDay) {
      const threeDay = day - 3 * milliseconds;
      return dispatch(profileSetDepositAll({ fromDate: threeDay }));
    }
  }, [setFieldValue]);

  return (
    <div>
      <DepositAllForm
        resultType={values.resultTypes}
        assetType={values.currency}
        time={values.time}
        onSubmit={handleSubmit}
        onTimeChange={onTimeChange}
        onResultChange={onResultChange}
        onAssetsChange={handleChange('currency')}
        timeOptions={optionsTimeType}
        resultOptions={optionsResultType}
        loading={isLoading}
        ClassName={ClassName}
        fifthLabel={t('TxID')}
        onTxIDChange={handleChange('txId')}
        secondLabel={t('Period of time')}
        thirdLabel={t('Assets')}
        fourthLabel={t('Status')}
        buttonText={t('Search')}
        txID={values.txId}
      />
    </div>
  );
};
