import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@betnomi/libs/components/Button';
import { ReactComponent as BetnomiIcon } from '@betnomi/libs/assets/img/affiliate/ETH-1.svg';
import { ReactComponent as BitcoinIcon } from '@betnomi/libs/assets/img/affiliate/ETH.svg';

import styles from './styles.module.scss';

const AboutUsSection: FC = () => {
  const { t } = useTranslation('affiliate');

  return (
    <section className={styles.aboutUs}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{t('About Us')}</h2>
          <p className={styles.text}>
            Betnomi program&apos;s goal is simple - your success is our success. Our program is built with the objective to increase your potential profit.
            Whether you promote all or just one of our products, in single markets or internationally, our experienced multilingual affiliate management
            team will help get you started, launch targeted campaigns and earn competitive commission rates. More importantly, we&apos;ll help you keep
            up to date with industry regulation, compliance and help you to maintain stable revenue growth,
            month after month - with special offers, reward schemes and engaging acquisition campaigns. What more could you want? Get started Today!
          </p>
        </div>

        <BetnomiIcon className={styles.BetnomiIcon} />
        <BitcoinIcon className={styles.BTCicon} />

        <Button
          type="submit"
          size={52}
          className={styles.terms}
        >
          {t('Terms & Conditions')}
        </Button>
      </div>
    </section>
  );
};

export { AboutUsSection };
