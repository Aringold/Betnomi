import React, { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { useTranslation } from '../../../../../i18n';
import styles from './styles.module.scss';

interface Props {
  code: string;
  campaignName: string;
  errors: Record<any, any>;
  touched: Record<any, any>;
  isLoading: boolean;

  onChangeCode: ChangeEventHandler<HTMLInputElement>;
  onChangeCampaignName: ChangeEventHandler<HTMLInputElement>;
  onTouchCode?: (e: any) => void;
  onTouchCampaignName?: (e: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>
}

const CampaignsForm: FC<Props> = ({
  code,
  errors,
  touched,
  campaignName,
  isLoading,
  onChangeCode,
  onChangeCampaignName,
  onTouchCode,
  onTouchCampaignName,
  onSubmit,
}) => {
  const { t } = useTranslation('profile');

  return (
    <div className={styles.content}>
      <form onSubmit={onSubmit}>
        <div className={styles.inputWrap}>
          <TextInput
            value={campaignName}
            onChange={onChangeCampaignName}
            onBlur={onTouchCampaignName}
            placeholder="Campaign name"
            inputClasses={styles.input}
            disabled={isLoading}
            hasError={!!(touched.campaignName && errors.campaignName)}
          />
        </div>
        <div className={styles.inputWrap}>
          <TextInput
            value={code}
            onChange={onChangeCode}
            onBlur={onTouchCode}
            placeholder="Code (Campaign id)"
            inputClasses={styles.input}
            disabled={isLoading}
            hasError={!!(touched.code && errors.code)}
          />
        </div>
        <button
          className={styles.addBtn}
          type="submit"
        >
          {t('Create')}
        </button>
      </form>
    </div>
  );
};

export { CampaignsForm };
