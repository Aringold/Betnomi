import React, { ChangeEventHandler, FC, FormEventHandler } from 'react';
import {
  Button,
  Checkbox,
} from '@betnomi/libs/components';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { useHistory } from 'react-router';
import { useTranslation } from '../../../i18n';
import { FontIcon, FontIconName } from '../../../../../libs/components/FontIcon';
import styles from './styles.module.scss';

type InputName = 'login' | 'terms';

interface Props {
  login: string;
  terms: boolean;
  errors: Partial<Record<InputName, string>>;
  touched: Partial<Record<InputName, boolean>>;
  isLoading?: boolean;

  onSubmit: FormEventHandler<HTMLFormElement>;
  onLoginChange: ChangeEventHandler<HTMLInputElement>;
  onBlurLogin: ChangeEventHandler<HTMLInputElement>;
  onTermsChange: (e: boolean) => void;
  onCloseModal: () => void;
}

const OAuthLoginForm: FC<Props> = ({
  terms,
  onSubmit,
  login,
  errors,
  touched,
  isLoading,
  onBlurLogin,
  onLoginChange,
  onTermsChange,
  onCloseModal,
}) => {
  const { t } = useTranslation('main');
  const history = useHistory();

  const onTermsClick = () => {
    history.push(process.env.REACT_APP_TERMS_URL || '#');
    onCloseModal();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <TextInput
        onChange={onLoginChange}
        hasError={!!(touched.login && errors.login)}
        onBlur={onBlurLogin}
        value={login}
        left={<FontIcon name={FontIconName.User} size={16} />}
        placeholder={t('Username')}
        withSeparator
      />

      <div className={styles.terms}>
        <Checkbox 
          checked={terms}
          onCheck={onTermsChange}
          className={styles.terms_checkbox}
          hasError={!!(errors.terms && touched.terms)}
        >
          <div className={styles.terms_text}>
            <span>
              {t('I agree to all')}
              {' '}
              {// eslint-disable-next-line
              <div className={styles.terms_link} onClick={onTermsClick}>
                <span className={styles.linkText}>{t('Terms & Conditions')}</span>
              </div>
              }
              {' '}
              {t('and I am over 18 years of age')}
            </span>
          </div>
        </Checkbox>
      </div>
      
      <Button type="submit" isLoading={isLoading}>
        {t('Sign Up')}
      </Button>
    </form>
  );
};

export { OAuthLoginForm };
