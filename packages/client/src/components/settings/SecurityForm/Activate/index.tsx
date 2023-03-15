/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { set2FAActivate } from 'store/settings/actionCreators';
import SecurityIcon from '@betnomi/libs/assets/img/icons/security.svg';
import { CopyText } from '@betnomi/libs/components/CopyText';
import QrCode from '@betnomi/libs/components/QrCode';
import ReactInputVerificationCode from 'react-input-verification-code';
import ClassNames from 'classnames';
import styles from './styles.module.scss';
import { useTranslation } from '../../../../i18n';

import {
  FontIcon,
  FontIconName,
} from '../../../../../../libs/components/FontIcon';
import { TextInput } from '../../../../../../libs/components/TextInput';
import { Button } from '../../../../../../libs/components';
import './index.css';

interface Props {
  onKeyCopy?: () => void;
  secrertKey: string;
  qrCodeUri: string;
}

export const Activate: FC<Props> = ({ secrertKey, onKeyCopy, qrCodeUri }) => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');

  const handleSubmit = () => 
    dispatch(
      set2FAActivate({
        secret: secrertKey,
        password,
        verificationCode: code,
      }),
    );

  return (
    <>
      <div className={styles.factor}>
        <div className={styles.tittle}>
          <img src={SecurityIcon} alt="security" />
          <p>{t('Two-factor Authentication')}</p>
        </div>
        <p className={styles.label}>
          {t('Download and install')} 
          {' '}
          <span>{t('Google Authenticator')}</span>
          {' '}
          {t('Enable Two-factor')}
        </p>
        <p className={ClassNames(styles.label, styles.qr_description)}>
          {t('Scan the QR code')}
        </p>

        <div className={styles.secret_key_wrap}>
          <div className={styles.qr}>
            <QrCode value={qrCodeUri} size={140} />
          </div>
          <div className={styles.key}>
            <div className={styles.label}>{t('Your secret key')}</div>
            <CopyText text={secrertKey} onCopy={onKeyCopy} />
          </div>
        </div>
        <p className={styles.label}>{t('Write down this code')}</p>
      </div>
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
          {t('Enable')}
        </Button>
      </div>
    </>
  );
};
