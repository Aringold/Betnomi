import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useTranslation } from 'react-i18next';
import { TabbedContent } from '@betnomi/client/src/components/common/TabbedContent';
import { Routes } from '@betnomi/client/src/constants/routes';
import { useTabOrder } from '@betnomi/client/src/hooks/useTabOrder';

import ReferralsTab from '@betnomi/client/src/containers/affiliate/Referrals';
import CommissionsTab from '@betnomi/client/src/containers/affiliate/Commissions';
import CampaignsTab from '@betnomi/client/src/containers/affiliate/Campaigns';
// import PromoMaterialsTab from '@betnomi/client/src/containers/affiliate/PromoMaterials';
// import AnalyticsTab from '@betnomi/client/src/containers/affiliate/Analytics';
import { useShallowSelector } from '../../../hooks';
import { selectIsMobile } from '../../../store/global/selectors';

import styles from './styles.module.scss';

enum Tab {
  Referrals = 'referrals',
  Commissions = 'commissions',
  Campaigns = 'campaigns',
  PromoMaterials = 'promo-materials',
  Analytics = 'analytics',
}

enum TabName {
  Referrals = 'Referrals',
  Commissions = 'Commissions',
  Campaigns = 'Campaigns',
  PromoMaterials = 'Promo Materials',
  Analytics = 'Analytics',
}

const tabOrder = [Tab.Referrals, Tab.Commissions, Tab.Campaigns, Tab.PromoMaterials, Tab.Analytics];
const tabNames = [TabName.Referrals, TabName.Commissions, TabName.Campaigns, TabName.PromoMaterials, TabName.Analytics];

interface Props {
}

const LoggedUser: FC<Props> = () => {
  const { t } = useTranslation('affiliate');
  const { tab } = useParams();
  const isMobile = useShallowSelector(selectIsMobile);
  const path = Routes.Affiliate.substring(0, Routes.Affiliate.lastIndexOf('/'));
  const { active, onTabChange } = useTabOrder(tabOrder, tab, path);

  return (
    <div className={styles.page}>
      <div className={styles.topBlock}>
        <h1>
          {`Affiliate ${tabNames[active]}`}
        </h1>
      </div>

      <Tabs active={active} onChange={onTabChange} controlled>
        <TabbedContent>
          <TabbedContent.Tabs>
            <Tabs.Head>
              <span>{t('Referrals')}</span>
              <span>{t('Commissions')}</span>
              <span>{t('Campaigns')}</span>
              {/* <span>{t('Promo Materials')}</span> */}
              {/* <span>{t('Analytics')}</span> */}
            </Tabs.Head>
          </TabbedContent.Tabs>
          <div className={styles.content}>
            <Tabs.Content>
              <ReferralsTab isMobile={isMobile} />
              <CommissionsTab />
              <CampaignsTab />
              {/* <PromoMaterialsTab /> */}
              {/* <AnalyticsTab /> */}
            </Tabs.Content>
          </div>
        </TabbedContent>
      </Tabs>
    </div>
  );
};

export { LoggedUser };
