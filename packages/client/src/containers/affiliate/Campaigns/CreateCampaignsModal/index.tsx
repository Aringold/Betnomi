/* eslint-disable no-console */
import React, { FC } from 'react';
import { ModalComponentProps } from '@betnomi/client/src/components/modal/Modal';

import { HocModal } from '@betnomi/client/src/components/modal/HocModal';
import { useTranslation } from '@betnomi/client/src/i18n';
import { useCreateCampaignsForm } from '../../../../hooks/formik/useCampaignsForm';
import { CampaignsForm } from './CampaignsForm';

interface Props extends ModalComponentProps {
}

export const CreateCampaignsModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');

  const {
    formik: {
      values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
    },
  } = useCreateCampaignsForm();

  return (
    <HocModal
      title={<span>{t('Create Campaign')}</span>}
      onClose={onCloseModal}
    >
      <CampaignsForm
        code={values.code}
        campaignName={values.campaignName}
        errors={errors}
        touched={touched}
        isLoading={isSubmitting}
        onChangeCode={handleChange('code')}
        onChangeCampaignName={handleChange('campaignName')}
        onTouchCode={handleBlur('code')}
        onTouchCampaignName={handleBlur('campaignName')}
        onSubmit={handleSubmit}
      />
    </HocModal>
  );
};
