import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import pana from '@betnomi/libs/assets/img/affiliate/pana.png';

import { useUserUI } from '@betnomi/client/src/hooks/useUserUI';
import styles from './styles.module.scss';
import { EarnMoneySection } from './EarnMoneySection';
import { CommissionsSection } from './CommissionsSection';
import { MarketingSection } from './MarketingSection';
import { FAQSection } from './FAQSection';
import { AboutUsSection } from './AboutUsSection';
import { TestimonialsSection } from './TestimonialsSection';

const NoLoggedUser: FC = () => {
  const { t } = useTranslation('affiliate');
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.affiliateWrap}>
      <section className={styles.topSection}>
        <div className={styles.content}>
          <div>
            <h2 className={styles.title}>{t('Betnomi Affiliates')}</h2>
            <p className={styles.subTitle}>{t('Join our exclusive club today!')}</p>
            <p className={styles.text}>{t('All the tools and support you need to establish a thriving affiliate business in one click.')}</p>
          </div>
          <div className={styles.image}>
            <img src={pana} alt="team" />
          </div>
        </div>
      </section>

      <CommissionsSection />
      <EarnMoneySection />
      <MarketingSection />
      <FAQSection />
      <AboutUsSection />
      <TestimonialsSection />
    </div>
  );
};

export { NoLoggedUser };
