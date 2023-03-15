import { useMemo } from 'react';
import { object, string } from 'yup';
import { FormikConfig, useFormik } from 'formik';
import { useTranslation } from '../../i18n';
import { useShallowSelector } from '../index';
import { selectAffiliateCampaigns } from '../../store/affiliate/selectors';

type Config = FormikConfig<ReferralsAllFormikValues>;

export interface ReferralsAllFormikValues {
  campaignName: { label: string, value: string }
  sortBy: { label: string, value: string }
  userName: string;
  limit: number,
  offset: number,
}

export const referralsAllInitialValues: ReferralsAllFormikValues = {
  campaignName: { label: 'All', value: 'All' },
  sortBy: { label: 'All', value: 'All' },
  userName: '',
  limit: 10,
  offset: 0,
};

const validationSchema = object().shape({
  fromDate: string(),
});

export const useReferralsForm = (
  onSubmit: Config['onSubmit'] = () => {},
) => {
  const { t } = useTranslation('profile');
  const {
    code,
  } = useShallowSelector(selectAffiliateCampaigns);

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: referralsAllInitialValues,
  });

  const CampaignNameList = useMemo(() =>
    Object.values(code || []).map((item) => ({
      label: item.campaignName,
      value: item.code,
    })), [code]);

  const all = [{ label: t('All'), value: 'All' }];
  const CampaignNameOptions = Object.assign(CampaignNameList, all);

  const SortByOptions = [
    { label: t('All'), value: 'All' },
    { label: t('Created'), value: 'Created' },
    { label: t('Total Deposit'), value: 'TotalDeposit' },
    { label: t('Wagered'), value: 'wagered' },
  ];

  return {
    formik,
    CampaignNameOptions,
    SortByOptions,
  };
};
