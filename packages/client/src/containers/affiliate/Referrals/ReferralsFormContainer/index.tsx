/* eslint-disable no-console */
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { Option } from '@betnomi/libs/components/Select';
import { selectProfileDepositAll } from '@betnomi/client/src/store/profile/selectors';
import { ReferralsAllFormikValues, useReferralsForm } from '@betnomi/client/src/hooks/formik/useReferralsForm';
import { affiliateGetCampaigns, affiliateGetReferrals } from '../../../../store/affiliate/actionCreators';
import { referralsAllInitialValues } from '../../../../hooks/formik/useReferralsForm';
import { ReferralsForm } from '../ReferralsForm';

type Props = {
  ClassName?: string
};

export const ReferralsFormContainer: React.FC<Props> = ({ ClassName }) => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();

  const { isLoading } = useShallowSelector(selectProfileDepositAll);

  const onSearch = useCallback((data: ReferralsAllFormikValues) => {
    console.log('data', data);
  }, []);

  const {
    formik: {
      values, handleSubmit, setFieldValue, handleChange,
    },
    CampaignNameOptions,
    SortByOptions,
  } = useReferralsForm(onSearch);

  const onSortByChange = useCallback((item:Option<string>) => {
    setFieldValue('sortBy', item);
  }, [setFieldValue]);

  const onChangeCampaign = useCallback((item:Option<string>) => {
    setFieldValue('campaignName', item);
  }, [setFieldValue]);

  useEffect(() => {
    dispatch(affiliateGetCampaigns());
    dispatch(affiliateGetReferrals(referralsAllInitialValues));
  }, []);

  return (
    <ReferralsForm
      onSubmit={handleSubmit}
      sortByeChange={onSortByChange}
      campaignType={values.campaignName}
      sortByType={values.sortBy}
      campaignChange={onChangeCampaign}
      campaignOptions={CampaignNameOptions}
      sortByOptions={SortByOptions}
      userName={values.userName}
      userNameChange={handleChange('userName')}
      loading={isLoading}
      ClassName={ClassName}
      firstLabel={t('Campaign Name')}
      secondLabel={t('Sort by')}
      thirdLabel={t('Search')}
    />
  );
};
