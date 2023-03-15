import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useTranslation } from 'react-i18next';
import { TabbedContent } from '../../../../components/common/TabbedContent';
import { Routes } from '../../../../constants/routes';
import { useTabOrder } from '../../../../hooks/useTabOrder';
import { GeneralSettings } from '../GeneralSettings';
import { SecuritySettings } from '../SecuritySettings';
import styles from './styles.module.scss';

enum Tab {
  General = 'general',
  Security = 'security',
  Privacy = 'privacy',
  Sessions = 'sessions',
}

const tabOrder = [Tab.General, Tab.Security, Tab.Privacy, Tab.Sessions];

interface Props {}

const ProfileSettings: FC<Props> = () => {
  const { t } = useTranslation('profile');
  const { params: { subTab } } = useRouteMatch<{ subTab: Tab }>();
  const { active, onTabChange } = useTabOrder(tabOrder, subTab, `${Routes.ProfileRoot}/settings`);

  return (
    <Tabs active={active} onChange={onTabChange} controlled>
      <TabbedContent>
        <TabbedContent.Tabs>
          <Tabs.Head>
            <span>{t('General')}</span>
            <span>{t('Security')}</span>
          </Tabs.Head>
        </TabbedContent.Tabs>

        <TabbedContent.Content className={styles.wrap}>
          <Tabs.Content>
            <GeneralSettings />
            <SecuritySettings />
          </Tabs.Content>
        </TabbedContent.Content>
      </TabbedContent>
    </Tabs>
  );
};

export { ProfileSettings };
