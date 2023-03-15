import React, { FC, useCallback } from 'react';

import { MyAvatarEditor } from '@betnomi/libs/components/AvatarEditor';

import DefaultImage from '@betnomi/libs/assets/img/profile/modalAvatar.png';

import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import { useDispatch } from 'react-redux';
import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';
import { AuthErrorTransformResult } from '../../../../types/store/auth';

import styles from './styles.module.scss';

import { useShallowSelector } from '../../../../hooks';

import { currentAvatar, newAvatar } from '../../../../store/global/selectors';

import { useTranslation } from '../../../../i18n';

import { uploadUserAvatar } from '../../../../store/auth/actionCreators';

interface Props extends ModalComponentProps {
}

export const EditAvatarModal: FC<Props> = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const { showErrorToast, hideToast } = useToasts();
  const Link = useShallowSelector(newAvatar);

  let image = useShallowSelector(currentAvatar);
  if (process.env.REACT_APP_CDN_URL) {
    image = process.env.REACT_APP_CDN_URL + image;
  }

  const onSubmit = useCallback(
    (
      file: string,
    ) => {
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
      dispatch(uploadUserAvatar({ file }, callback));
    },
    [dispatch, showErrorToast, hideToast],
  );

  return (
    <HocModal
      title={<span>{t('Edit Your Avatar')}</span>}
      onClose={onCloseModal}
      className={styles.wrap}
    >
      <MyAvatarEditor avatar={Link || image || DefaultImage} submit={onSubmit} />
    </HocModal>
  );
};
