import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

type Config = FormikConfig<ChangeEmailFormikValues>;

export interface ChangeEmailFormikValues {
  newEmail: string;
  newEmailConfirm: string;
}

export const signInInitialValues: ChangeEmailFormikValues = {
  newEmail: '',
  newEmailConfirm: '',
};

const signinSchema = yup.object({
  newEmail: yup.string().required(),
  newEmailConfirm: yup.string().required(),
});

export const useChangeProfileEmailFormik = (
  values: ChangeEmailFormikValues = signInInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<ChangeEmailFormikValues>({
    initialValues: initialValues.current,
    validationSchema: signinSchema,
    onSubmit,
  });
};
