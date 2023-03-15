/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckboxSwitcher } from '@betnomi/libs/components/CheckboxSwitcher';
import ClassNames from 'classnames';
import { Checkbox } from '@betnomi/libs/components/Checkbox';
import { useShallowSelector } from 'hooks';
import { selectPrivacy } from 'store/settings/selectors';
import { setPrivacy } from 'store/settings/actionCreators';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

interface Props {
  
}

export const PrivacyForm: FC<Props> = (
 
) => {
  const [hideBets, setHideBets] = useState(false);
  const [hidePlayerStatistics, setHidePlayerStatistics] = useState(false);
  const [hideRaceStatistics, setHideRaceStatistics] = useState(false);
  const [isRain, setIsRain] = useState(false);
  const [isOptOfEmails, setIsOptOfEmails] = useState(false);
  
  const [isPromotion, setIsPromotion] = useState(false);
  const [isSesion, setIsSesion] = useState(false);
  const [isNotifications, setIsNotification] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const { t } = useTranslation('profile');

  const { isUsernameHidden } = useShallowSelector(selectPrivacy);

  const dispatch = useDispatch();
  const onHideUserName = () => dispatch(setPrivacy({ isUsernameHidden: !isUsernameHidden }));

  return (
    <div className={styles.content_wrap}>
      <p className={styles.label}>
        {t('Select the options you need and put them into operation')}
        :
      </p>
      <div className={ClassNames(styles.item_wrap, styles.border_top)}>
        <CheckboxSwitcher checked={hideBets} onCheck={() => setHideBets(!hideBets)} /> 
        <p>{t('Hide your bets from the public')}</p>
      </div>
      <div className={styles.item_wrap}>
        <CheckboxSwitcher checked={isUsernameHidden} onCheck={onHideUserName} /> 
        <p>{t('Hide your username from public')}</p>
      </div>
      <div className={styles.item_wrap}>
        <CheckboxSwitcher checked={hidePlayerStatistics} onCheck={() => setHidePlayerStatistics(!hidePlayerStatistics)} /> 
        <p>{t('Hide player statistics from public')}</p>
      </div>
      <div className={styles.item_wrap}>
        <CheckboxSwitcher checked={hideRaceStatistics} onCheck={() => setHideRaceStatistics(!hideRaceStatistics)} /> 
        <p>{t('Hide race statistics from public')}</p>
      </div>
      <div className={styles.item_wrap}>
        <CheckboxSwitcher checked={isRain} onCheck={() => setIsRain(!isRain)} /> 
        <div>
          <p>{t('Stop rain')}</p>
          <p className={styles.description}>{t('You wot receive rain from the chat')}</p>
        </div>
      </div>
      <div className={ClassNames(styles.item_wrap, styles.opt_emails)}>
        <div className={styles.opt_wrap}>
          <CheckboxSwitcher checked={isOptOfEmails} onCheck={() => setIsOptOfEmails(!isOptOfEmails)} /> 
          <p>{t('Opt-out of emails')}</p>
        </div>
        {isOptOfEmails && (
        <div className={styles.checkbox_wrap}>
          <Checkbox checked={isPromotion} onCheck={() => setIsPromotion(!isPromotion)} className={ClassNames(styles.checkbox, styles.promotion)}>Promotions</Checkbox>
          <Checkbox checked={isNotifications} onCheck={() => setIsNotification(!isNotifications)} className={ClassNames(styles.checkbox, styles.notification)}>System notifications</Checkbox>
          <Checkbox checked={isSesion} onCheck={() => setIsSesion(!isSesion)} className={ClassNames(styles.checkbox, styles.session)}>Session</Checkbox>
          <Checkbox checked={isAlert} onCheck={() => setIsAlert(!isAlert)} className={ClassNames(styles.checkbox, styles.alert)}>Login alert</Checkbox>
        </div>
        )}
      </div>
    </div>
  );
};
