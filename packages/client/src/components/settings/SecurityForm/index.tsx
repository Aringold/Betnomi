/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import ClassNames from 'classnames';
import { CheckboxSwitcher } from '@betnomi/libs/components/CheckboxSwitcher';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import {
  FontIcon,
  FontIconName,
} from '../../../../../libs/components/FontIcon';
import { useUserUI } from '../../../hooks/useUserUI';
import { Activate } from './Activate';
import { Deactivate } from './Deactivate';

interface Props {
  onKeyCopy?: () => void;
  secrertKey: string;
  qrCodeUri: string;
  isEnabled: boolean;
}

export const SecurityForm: FC<Props> = ({
  secrertKey,
  onKeyCopy,
  qrCodeUri,
  isEnabled,
}) => {
  const [loginChecked, setLoginChecked] = useState(true);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [withdrawalChecked, setWithdrawalChecked] = useState(false);
  const { t } = useTranslation('profile');
  const { isChatActive } = useUserUI();

  return (
    <div
      className={ClassNames(styles.content_wrap, {
        [styles.active]: isChatActive,
      })}
    >
      <div className={styles.left_content}>
        {isEnabled ? (
          <Deactivate />
        ) : (
          <Activate
            secrertKey={secrertKey}
            onKeyCopy={onKeyCopy}
            qrCodeUri={qrCodeUri}
          />
        )}
      </div>
      <div className={styles.right_content}>
        <p className={styles.label}>
          {t('Select options to check the Authentication')}
          :
        </p>
        <div className={styles.options_wrap}>
          <div>
            <FontIcon name={FontIconName.User} size={16} />
            {t('Login Verification')}
          </div>
          <CheckboxSwitcher
            className={styles.switcher}
            checked={loginChecked}
            onCheck={() => setLoginChecked(!loginChecked)}
          />
        </div>
        <div className={styles.options_wrap}>
          <div>
            <FontIcon name={FontIconName.Lock} size={16} />
            {t('Password Change')}
          </div>
          <CheckboxSwitcher
            className={styles.switcher}
            checked={passwordChecked}
            onCheck={() => setPasswordChecked(!passwordChecked)}
          />
        </div>
        <div className={styles.options_wrap}>
          <div>
            <FontIcon name={FontIconName.Bitcoin} size={16} />
            {t('Withdrawal')}
          </div>
          <CheckboxSwitcher
            className={styles.switcher}
            checked={withdrawalChecked}
            onCheck={() => setWithdrawalChecked(!withdrawalChecked)}
          />
        </div>
      </div>
    </div>
  );
};
