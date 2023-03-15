/* eslint-disable no-console */
import React, { FC, useEffect, useRef } from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import Button from '@betnomi/libs/components/Button';
import { useDispatch } from 'react-redux';
import { changePassword, ChangePasswordData } from 'store/settings/actionCreators';
import { useShallowSelector } from 'hooks';
import { selectChangePassword } from 'store/settings/selectors';
import { showErrorToast, showSuccessToast } from '@betnomi/libs/components/Toaster';
import { useChangeProfilePasswordFormik } from '../../../hooks/formik/useChangeProfilePasswordFormik';

import styles from './styles.module.scss';

interface Props {}

const ChangePasswordForm: FC<Props> = () => {
  const { t } = useTranslation('profile');
  const { isLoading, error } = useShallowSelector(selectChangePassword);
  const prevIsLoading = useRef(isLoading);

  const dispatch = useDispatch();

  const onSubmit = (data: ChangePasswordData) => {
    if (data.currentPassword && data.newPassword && data.newPasswordConfirm) {
      dispatch(changePassword(data)); 
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    errors,
  } = useChangeProfilePasswordFormik(
    { currentPassword: '', newPassword: '', newPasswordConfirm: '' },
    onSubmit,
  );

  useEffect(() => {
    if (prevIsLoading.current && !isLoading) {
      if (!error) {
        showSuccessToast('Password successfully changed');
        setValues({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });
      } else {
        showErrorToast(error.message);
      }
    }
    prevIsLoading.current = isLoading;
  }, [isLoading]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.label}>{t('Change Password')}</p>
      <TextInput
        type="password"
        value={values.currentPassword}
        className={styles.input}
        name="currentPassword"
        onChange={handleChange}
        onBlur={handleBlur('currentPassword')}
        left={<FontIcon name={FontIconName.Lock} size={16} />}
        placeholder={t('Old password')}
        hasError={Boolean(errors.currentPassword)}
      />
      <TextInput
        type="password"
        value={values.newPassword}
        name="newPassword"
        className={styles.input}
        onChange={handleChange}
        onBlur={handleBlur('newPassword')}
        left={<FontIcon name={FontIconName.Lock} size={16} />}
        placeholder={t('New password')}
        hasError={Boolean(errors.newPassword)}
      />
      <TextInput
        type="password"
        value={values.newPasswordConfirm}
        name="newPasswordConfirm"
        className={styles.input}
        onChange={handleChange}
        onBlur={handleBlur('newPasswordConfirm')}
        left={<FontIcon name={FontIconName.Lock} size={16} />}
        placeholder={t('Confirm new password')}
        hasError={Boolean(errors.newPasswordConfirm)}
      />
      <Button
        type="submit"
        className={styles.submit_button}
        disabled={isLoading ||
          Boolean(errors.newPasswordConfirm) ||
          Boolean(errors.newPassword) ||
          Boolean(errors.newPasswordConfirm)}
      >
        {t('Change Password')}
      </Button>
    </form>
  );
};

export { ChangePasswordForm };
