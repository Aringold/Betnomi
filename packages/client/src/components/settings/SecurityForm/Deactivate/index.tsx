/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SecurityIcon from '@betnomi/libs/assets/img/icons/security.svg';
import ReactInputVerificationCode from 'react-input-verification-code';
import { set2FADeactivate } from 'store/settings/actionCreators';
import styles from './styles.module.scss';
import { useTranslation } from '../../../../i18n';
import {
  FontIcon,
  FontIconName,
} from '../../../../../../libs/components/FontIcon';
import { TextInput } from '../../../../../../libs/components/TextInput';
import { Button } from '../../../../../../libs/components';
import './index.css';

interface Props {}

export const Deactivate: FC<Props> = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');

  const handleSubmit = () => {
    dispatch(set2FADeactivate({
      password,
      verificationCode: code,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tittle}>
        <img src={SecurityIcon} alt="security" />
        <p>{t('Two-factor Authentication')}</p>
      </div>
      <p className={styles.paragraph}>
        {t(
          'To disable Two-Factor authentication, enter your one-time Password (OTP)',
        )}
      </p>
      <div className={styles.verification_wrap}>
        <p className={styles.label}>
          {t('Verification code')}
          :
        </p>
        <div className={styles.verification}>
          <ReactInputVerificationCode
            length={6}
            placeholder=""
            onChange={setCode}
            value={code}
          />
        </div>
        <TextInput
          type="password"
          value={password}
          className={styles.password_input}
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          left={<FontIcon name={FontIconName.Lock} size={16} />}
          placeholder={t('Password')}
        />
        <Button
          type="submit"
          className={styles.enable_button}
          onClick={handleSubmit}
        >
          {t('Disabled')}
        </Button>
      </div>
    </div>
  );
};
