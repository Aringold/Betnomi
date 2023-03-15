import React, { useState } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import Button from '@betnomi/libs/components/Button';
import { HocModal } from '../../components/modal/HocModal';
import { ModalComponentProps } from '../../components/modal/Modal';
import styles from './styles.module.scss';
import './index.css';

interface IProps extends ModalComponentProps {}

export const TwoFAModal: React.FC<IProps> = ({ onCloseModal }) => {
  const [code, setCode] = useState('');
  
  return (
    <HocModal
      className={styles.containerModal}
      onClose={onCloseModal}
      title={(
        <span className={styles.label}>
          Security verification
        </span>
      )}
    >
      <p className={styles.description}>To secure your account, please complete the following verification.</p>
      <div className={styles.title}>Google Verification Code</div>
      <div className="inSignInPupoup">
        <ReactInputVerificationCode
          length={6}
          placeholder=""
          onChange={setCode}
          value={code}
        />
      </div>
      <div className={styles.note}>
        Enter the 6 digit code from Google Authenticator.
      </div>
      <Button className={styles.button}>Submit</Button>
      <button className={styles.secondary_btn}>Security cerification unavailable?</button>
    </HocModal>
  );
};
