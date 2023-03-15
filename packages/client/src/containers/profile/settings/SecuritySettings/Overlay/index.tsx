/* eslint-disable max-len */
import React, { FC } from 'react';
import {
  FontIcon,
  FontIconName,
} from '@betnomi/libs/components/FontIcon';
import { Button } from '@betnomi/libs/components';
import styles from './styles.module.scss';

interface Props {
  handleEnabled2FA: () => void
}

export const Overlay: FC<Props> = ({ handleEnabled2FA }) => (
  <div className={styles.overlay}>
    <div className={styles.wrapper}>
      <div className={styles.icon}><FontIcon name={FontIconName.Info} size={64} /></div>
      <div className={styles.title}>Attention !</div>
      <p>
        The information you are about to see is highly sensitive and essential to your account security.
        Never share with anyone the information contained on this page.
        {' '}
      </p>
      <Button
        type="submit"
        className={styles.button}
        onClick={handleEnabled2FA}
      >
        I understand
      </Button>
    </div>
  </div>
);
