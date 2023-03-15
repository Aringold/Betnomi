import { FormikConfig, useFormik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

type Config = FormikConfig<ChangePasswordFormikValues>;

export interface ChangePasswordFormikValues {
  currentPassword: any;
  newPassword: any;
  newPasswordConfirm: any;
}

export const signInInitialValues: ChangePasswordFormikValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const ChangePasswordSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().required(),
  newPasswordConfirm: yup.string().required(),
});

export const useChangeProfilePasswordFormik = (
  values: ChangePasswordFormikValues = signInInitialValues,
  onSubmit: Config['onSubmit'],
) => {
  const initialValues = useRef(values);
  return useFormik<ChangePasswordFormikValues>({
    initialValues: initialValues.current,
    validationSchema: ChangePasswordSchema,
    onSubmit,
  });
};
