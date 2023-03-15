import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import classNames from 'classnames';
import Button from '@betnomi/libs/components/Button';
import { CheckboxSwitcher } from '@betnomi/libs/components/CheckboxSwitcher';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import EditPhotoIcon from '@betnomi/libs/assets/img/icons/edit_photo.svg';
import defaultAvatar from '@betnomi/libs/assets/img/profile/avatar.png';
import { useShallowSelector } from 'hooks';
import { selectViewInFiatCurrency } from 'store/settings/selectors';
import { setViewInFiatCurrency } from 'store/settings/actionCreators';
import { useUser } from 'hooks/useUser';
import { currencyWithSymbols } from 'constants/Currency';
import styles from './styles.module.scss';
import { ChangeEmailForm } from '../ChangeEmailForm';
import { ChangePasswordForm } from '../ChangePasswordForm';
import { ModalType } from '../../../store/modal/types';
import { setNewAvatar } from '../../../store/global/actionCreators';

import { useModal } from '../../../hooks/useModal';

interface Props {
  image: string;
}

const GeneralForm: FC<Props> = ({ image }) => {
  const dispatch = useDispatch();

  const viewInFiatCurrency = useShallowSelector(selectViewInFiatCurrency);
  const {
    bcCurrency,
  } = useUser();

  const { t } = useTranslation('profile');
  const { showModal } = useModal();

  const addPhoto = (event:any) => {
    const newAvatar = URL.createObjectURL(event.target.files[0]);
    dispatch(setNewAvatar({ newAvatar }));
    showModal(ModalType.EditAvatar)();
  };

  let userImage: string = defaultAvatar;
  if (!!image && process.env.REACT_APP_CDN_URL) {
    userImage = process.env.REACT_APP_CDN_URL + image;
  }

  const currency = useMemo(() => currencyWithSymbols.find((currencySymbol) => currencySymbol.label === bcCurrency) ?? currencyWithSymbols[0], [bcCurrency]); 

  return (
    <div className={styles.generalContent}>
      <div className={styles.avatarContent}>
        <h3 className={styles.label}>{t('Avatar')}</h3>
        <div className={styles.avatar_wrap}>
          <div className={styles.mask}>
            <input type="file" id="upload-btn" hidden onChange={addPhoto} />
            <label htmlFor="upload-btn" className={styles.avatar_label}>
              <img className={styles.avatar} src={userImage} alt="user avatar" />
            </label>
          </div>
          <div className={styles.btn_wrap}>
            <Button
              color="mesg_color"
              className={classNames(styles.btn)}
              onClick={() => {
                showModal(ModalType.EditAvatar)();
              }}
            >
              <img src={EditPhotoIcon} alt="edit avatar" className={styles.btn_icon} />
              {t('Edit avatar')}
            </Button>
            <Button
              color="danger"
              className={classNames(styles.btn, styles.delete_button)}
              onClick={() => {
                showModal(ModalType.DeletePhoto)();
              }}
            >
              <FontIcon name={FontIconName.Deleted} size={16} className={styles.btn_icon} />
              {t('Delete avatar')}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.currency_content}>
        <h3 className={styles.label}>{t('Currency')}</h3>
        <div className={styles.currency_wrap}>
          <div className={styles.currency_value}>
            <img className={styles.usd_icon} src={currency.icon} alt={currency.label} />
            <p>{currency.label}</p>
          </div>
          <CheckboxSwitcher checked={viewInFiatCurrency} onCheck={() => dispatch(setViewInFiatCurrency(!viewInFiatCurrency))} />
        </div>
        <Button
          color="mesg_color"
          className={classNames(styles.btn, styles.currency_btn)}
          onClick={() => {
            showModal(ModalType.ManageCurrency)();
          }}
        >
          {t('Manage Currency')}
        </Button>
      </div>
      <div className={styles.email_content}><ChangeEmailForm /></div>
      <div className={styles.password_content}><ChangePasswordForm /></div>
    </div>

  );
};

export { GeneralForm };
