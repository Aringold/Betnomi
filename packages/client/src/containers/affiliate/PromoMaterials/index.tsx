import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@betnomi/libs/components/Button';
import classNames from 'classnames';

import { ReactComponent as AudioDescriptionImg } from '@betnomi/libs/assets/img/affiliate/audio-description.svg';
import { ReactComponent as NetworkCommunicationImg } from '@betnomi/libs/assets/img/affiliate/network-communication.svg';
import { ReactComponent as PaperDevImg } from '@betnomi/libs/assets/img/affiliate/paper-dev.svg';
import { ReactComponent as UrlImg } from '@betnomi/libs/assets/img/affiliate/url.svg';
import styles from './styles.module.scss';

interface Props {
}

const PromoMaterials: FC<Props> = () => {
  const { t } = useTranslation('profile');
  
  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <div className={styles.title}>
          <h4>{t('Marketing Tools')}</h4>
          <p>
            {t(
              'More friends - more Rederral Bonuses! Attrct people by different types of pictures for any taste and size. ' +
              'Choose which you like and share it with your referral link in social networks.',
            )}
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.list}>
          <div className={styles.listItem}>
            <UrlImg />
            <p>Link Creator</p>
          </div>
          <div className={styles.listItem}>
            <NetworkCommunicationImg />
            <p>Social Share</p>
          </div>
          <div className={styles.listItem}>
            <AudioDescriptionImg />
            <p>Media</p>
          </div>
          <div className={styles.listItem}>
            <PaperDevImg />
            <p>JSON-Feed</p>
          </div>
        </div>

        <Button
          color="primary"
          className={classNames(styles.btn)}
        >
          {t('Start Now')}
        </Button>
      </div>
    </div>
  );
};

export default PromoMaterials;
