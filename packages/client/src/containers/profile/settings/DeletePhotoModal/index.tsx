import React, { FC } from 'react';
import Button from '@betnomi/libs/components/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import styles from './styles.module.scss';

import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';

import { removeUserAvatar } from '../../../../store/auth/actionCreators';

import { AuthErrorTransformResult } from '../../../../types/store/auth';

interface Props extends ModalComponentProps {
}

export const DeletePhotoModal: FC<Props> = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const { showErrorToast, hideToast } = useToasts();

  const onSubmit = () => {
    hideToast();
    const callback = (e?: AuthErrorTransformResult) => {
      if (e) {
        if (e.message) {
          showErrorToast(t(e.message), t('Avatar is uploaded'));
        }
        return;
      }
      showSuccessToast('', t('Avatar is uploaded'));
    };
    dispatch(removeUserAvatar(callback));
    onCloseModal();
  };

  return (
    <HocModal
      title={<span>{t('Notification')}</span>}
      onClose={onCloseModal}
    >
      <div className={styles.content}>
        <p className={styles.text}>{t('Are you sure you want to delete your profile picture?')}</p>
        <div className={styles.btn_wrap}>
          <Button
            onClick={onSubmit}
            className={styles.btn}
            type="submit"
          >
            {t('Confirm')}
          </Button>
          <Button
            onClick={onCloseModal}
            className={styles.btn}
            color="danger"
          >
            {t('Cancel')}
          </Button>
        </div>
      </div>
    </HocModal>
  );
};
