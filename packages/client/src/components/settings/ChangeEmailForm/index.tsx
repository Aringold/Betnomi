/* eslint-disable no-console */
import React, { FC, useEffect, useRef } from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import Button from '@betnomi/libs/components/Button';
import { useDispatch } from 'react-redux';
import { changeEmail, ChangeEmailData } from 'store/settings/actionCreators';
import { showErrorToast, showSuccessToast } from '@betnomi/libs/components/Toaster';
import { useShallowSelector } from 'hooks';
import { selectChangeEmail } from 'store/settings/selectors';
import { useUser } from 'hooks/useUser';
import { useChangeProfileEmailFormik } from '../../../hooks/formik/useChangeProfileEmailFormik';

import styles from './styles.module.scss';

interface Props {}

const ChangeEmailForm: FC<Props> = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { isLoading, error } = useShallowSelector(selectChangeEmail);
  const { email } = useUser();

  const prevIsLoading = useRef(isLoading);

  const onSubmit = (data: ChangeEmailData) => {
    if (data.newEmail && data.newEmailConfirm) {
      dispatch(changeEmail(data));
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
  } = useChangeProfileEmailFormik(
    { newEmail: '', newEmailConfirm: '' },
    onSubmit,
  );

  useEffect(() => {
    if (prevIsLoading.current && !isLoading) {
      if (!error) {
        showSuccessToast('Email successfully changed');
        setValues({ newEmail: '', newEmailConfirm: '' });
      } else {
        showErrorToast(error.message);
      }
    }
    prevIsLoading.current = isLoading;
  }, [isLoading]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.label}>{t('Change E-mail')}</h3>
      <TextInput
        type="text"
        value={email}
        className={styles.input}
        name="email"
        left={<FontIcon name={FontIconName.Email} size={16} />}
        placeholder={t('Email')}
        disabled
      />
      <TextInput
        type="text"
        value={values.newEmail}
        name="newEmail"
        className={styles.input}
        onChange={handleChange}
        left={<FontIcon name={FontIconName.Email} size={16} />}
        placeholder={t('New email')}
        onBlur={handleBlur('newEmail')}
        hasError={Boolean(errors.newEmail)}
      />
      <TextInput
        type="text"
        value={values.newEmailConfirm}
        name="newEmailConfirm"
        className={styles.input}
        onChange={handleChange}
        left={<FontIcon name={FontIconName.Email} size={16} />}
        placeholder={t('Confirm new email')}
        onBlur={handleBlur('newEmailConfirm')}
        hasError={Boolean(errors.newEmailConfirm)}
      />
      <Button
        type="submit"
        className={styles.submit_button}
        disabled={isLoading || Boolean(errors.newEmail) || Boolean(errors.newEmailConfirm)}
      >
        {t('Change Email')}
      </Button>
    </form>
  );
};

export { ChangeEmailForm };
