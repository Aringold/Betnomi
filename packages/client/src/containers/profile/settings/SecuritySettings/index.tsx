import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useShallowSelector } from 'hooks';
import { select2FA } from 'store/settings/selectors';
import { get2FA } from 'store/settings/actionCreators';
import { useTranslation } from '../../../../i18n';
import { SecurityForm } from '../../../../components/settings/SecurityForm';
import { Overlay } from './Overlay';

export const SecuritySettings = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const {
    isLoading, isEnabled, qrCodeSecret, qrCodeUri, error,
  } = useShallowSelector(select2FA);

  const { showSuccessToast, showErrorToast } = useToasts();
  const onKeyCopy = useCallback(() => showSuccessToast(t('The secret key was copied to your clipboard')), [
    showSuccessToast,
  ]);

  useEffect(() => {
    if (qrCodeSecret === '' && !isEnabled && !isLoading) {
      dispatch(get2FA());
    } 
  }, [qrCodeSecret, isEnabled, isLoading]);

  const didMountRefError = useRef(false);
  useEffect(() => {
    if (didMountRefError.current) {
      if (error !== undefined) {
        showErrorToast(error.message);
      }
    } else didMountRefError.current = true;
  }, [error]);

  const handleEnabled2FA = () => {
    dispatch(get2FA());
  };
  
  return (
    <div style={isLoading ? { height: '500px' } : {}}>
      {isLoading ? <Overlay handleEnabled2FA={handleEnabled2FA} /> : null}
      {!isLoading ? (
        <SecurityForm 
          onKeyCopy={onKeyCopy} 
          secrertKey={qrCodeSecret} 
          qrCodeUri={qrCodeUri}
          isEnabled={isEnabled}
        />
      ) : null}
    </div>
  ); 
};
