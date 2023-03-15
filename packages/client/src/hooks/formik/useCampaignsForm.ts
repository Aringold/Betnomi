import { useCallback, useRef } from 'react';

import { object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { FormikHelpers, useFormik } from 'formik';
import { affiliateCreateCampaigns } from '../../store/affiliate/actionCreators';

export interface CampaignsAllFormikValues {
  limit: number,
  offset: number,
}

export const campaignsAllInitialValues: CampaignsAllFormikValues = {
  limit: 10,
  offset: 0,
};

export interface CampaignsFormikValues {
  campaignName: string,
  code: string,
  url: string,
}

export const campaignsInitialValues: CampaignsFormikValues = {
  campaignName: '',
  code: '',
  url: '',
};

const validationSchema = object().shape({
  campaignName: string().required(),
  code: string().required(),
});

export const useCreateCampaignsForm = (
  values: CampaignsFormikValues = campaignsInitialValues,
) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (
      vals: CampaignsFormikValues,
      { setSubmitting }: FormikHelpers<CampaignsFormikValues>,
    ) => {
      dispatch(affiliateCreateCampaigns(vals));
      setSubmitting(false);
    }, [],
  );
  const initialValues = useRef(values);

  const formik = useFormik<CampaignsFormikValues>({
    initialValues: initialValues.current,
    validationSchema,
    onSubmit,
  });

  return {
    formik,
  };
};
