/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from '@betnomi/libs/components/Button';
import { ReactComponent as UrlImg } from '@betnomi/libs/assets/img/affiliate/url.svg';
import { ReactComponent as NetworkCommunicationImg } from '@betnomi/libs/assets/img/affiliate/network-communication.svg';
import { ReactComponent as Html5Icon } from '@betnomi/libs/assets/img/affiliate/html5.svg';
import { ReactComponent as AudioDescriptionImg } from '@betnomi/libs/assets/img/affiliate/audio-description.svg';
import { ReactComponent as XmlIcon } from '@betnomi/libs/assets/img/affiliate/xml.svg';
import { ReactComponent as PaperDevImg } from '@betnomi/libs/assets/img/affiliate/paper-dev.svg';
import { useUserUI } from '../../../../hooks/useUserUI';
import styles from './styles.module.scss';
import { modalShow } from '../../../../store/modal/actionCreators';
import { ModalType } from '../../../../store/modal/types';

const MarketingSection: FC = () => {
  const { t } = useTranslation('affiliate');
  const dispatch = useDispatch();
  const {
    setIsMenuActive,
  } = useUserUI();

  const onOpenSignInModal = useCallback(
    () => {
      dispatch(modalShow(ModalType.SignIn));
      setIsMenuActive(false);
    }, [dispatch],
  );

  return (
    <section className={styles.marketing}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{t('Marketing Tools')}</h2>
          <p className={styles.subTitle}>{t('Easy way to manage your work process')}</p>
        </div>

        <div className={styles.list}>
          <div className={`${styles.listItem} ${styles.link}`} onClick={onOpenSignInModal}>
            <UrlImg />
            <p>Link Creator</p>
          </div>
          <div className={`${styles.listItem} ${styles.social}`} onClick={onOpenSignInModal}>
            <NetworkCommunicationImg />
            <p>Social Share</p>
          </div>
          <div className={`${styles.listItem} ${styles.banner}`} onClick={onOpenSignInModal}>
            <Html5Icon />
            <p>Banner Builder</p>
          </div>
          <div className={`${styles.listItem} ${styles.media}`} onClick={onOpenSignInModal}>
            <AudioDescriptionImg />
            <p>Media</p>
          </div>
          <div className={`${styles.listItem} ${styles.xml}`} onClick={onOpenSignInModal}>
            <XmlIcon />
            <p>XML-Feed</p>
          </div>
          <div className={`${styles.listItem} ${styles.json}`} onClick={onOpenSignInModal}>
            <PaperDevImg />
            <p>JSON-Feed</p>
          </div>
        </div>

        <Button
          type="button"
          className={styles.showNowBtn}
          onClick={onOpenSignInModal}
        >
          {t('Start Now')}
        </Button>
      </div>
    </section>
  );
};

export { MarketingSection };
