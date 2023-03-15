/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import Button from '@betnomi/libs/components/Button';
import BonusIcon from '@betnomi/libs/assets/img/BonusGroup.svg';
import styles from './styles.module.scss';

import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';

import { useTranslation } from '../../../../i18n';

interface Props extends ModalComponentProps {
}

export const AddBonusModal: FC<Props> = ({ onCloseModal }) => {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Add Bonus Code')}</span>}
      onClose={onCloseModal}
      className={styles.bonuseModal}
    >
      <div className={styles.content}>
        <img src={BonusIcon} alt="bonus" width={128} />
        <h3 className={styles.title}>{t('Bonus Code')}</h3>
        <p className={styles.description}>Please enter your bonus code in the box below to activate your bonuses.</p>
        <input className={styles.input} value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} placeholder={t('Enter your bonus code')} />
        <Button
          type="submit"
          className={styles.submit_button}
        >
          {t('Submit')}
        </Button>
      </div>

    </HocModal>
  );
};
