import React, { FC } from 'react';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import H4 from '@betnomi/libs/components/H4';
import { useRouteMatch } from 'react-router-dom';
import { IconTab } from '@betnomi/libs/components/tabs/IconTab';
import { useTranslation } from '../../i18n';
import { ProfileWallet } from '../../containers/profile/wallet/ProfileWallet';
import { ProfileTransactions } from '../../containers/profile/transaction/ProfileTransactions';
import { ProfileSettings } from '../../containers/profile/settings/ProfileSettings';
import { ProfileBonuses } from '../../containers/profile/bonuses/ProfileBonuses';
import { useTabOrder } from '../../hooks/useTabOrder';
import { Routes } from '../../constants/routes';
import { Authorized } from '../../containers/app/Authorized';
import { TabsSelect } from '../../../../libs/components/TabsSelect';
import { useShallowSelector } from '../../hooks';
import { selectIsMobile } from '../../store/global/selectors';
import styles from './styles.module.scss';

interface Props {}

enum Tab {
  Wallet = 'wallet',
  Transactions = 'transactions',
  Settings = 'settings',
  Bonuses = 'bonuses',
}

const tabOrder = [
  Tab.Wallet,
  Tab.Transactions,
  Tab.Settings,
  Tab.Bonuses,
];

const Profile: FC<Props> = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { t } = useTranslation('profile');
  const { params: { tab } } = useRouteMatch<{ tab: Tab }>();
  const { active, onTabChange } = useTabOrder(tabOrder, tab, Routes.ProfileRoot);

  return (
    <Authorized redirect={Routes.Homepage}>
      <Tabs active={active} onChange={onTabChange} controlled>
        <div className={styles.page}>
          <div className={styles.head}>
            <Tabs.Content>
              <H4>{t('Wallet')}</H4>
              <H4>{t('Transactions')}</H4>
              <H4>{t('General Settings')}</H4>
              <H4>{t('Bonus and Rewards')}</H4>
            </Tabs.Content>

            {!isMobile && (
              <div className={styles.tabs}>
                <Tabs.Head className="mainTabs">
                  <IconTab className={styles.text} icon={FontIconName.Wallet}>{t('Wallet')}</IconTab>
                  <IconTab className={styles.text} icon={FontIconName.Transaction}>{t('Transactions')}</IconTab>
                  <IconTab className={styles.text} icon={FontIconName.Settings}>{t('Settings')}</IconTab>
                  <IconTab className={styles.text} icon={FontIconName.Promo}>{t('Bonuses')}</IconTab>
                </Tabs.Head>
              </div>
            )}
            {isMobile && (
            <TabsSelect active={active} onChange={onTabChange}>
              <TabsSelect.Value icon={FontIconName.Wallet} value="Wallet" />
              <TabsSelect.Value icon={FontIconName.Transaction} value="Transactions" />
              <TabsSelect.Value icon={FontIconName.Settings} value="Settings" />
              <TabsSelect.Value icon={FontIconName.Promo} value="Bonuses" />
            </TabsSelect>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <Tabs.Content>
            <ProfileWallet isMobile={isMobile} />
            <ProfileTransactions isMobile={isMobile} />
            <ProfileSettings />
            <ProfileBonuses />
          </Tabs.Content>
        </div>
      </Tabs>
    </Authorized>
  );
};

export default Profile;
