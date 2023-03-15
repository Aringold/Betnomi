import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useTranslation } from '../../../../i18n';
import { TabbedContent } from '../../../../components/common/TabbedContent';
import styles from '../../ProfileBets/styles.module.scss';
import { Transaction } from '../Transaction';
import { useTabOrder } from '../../../../hooks/useTabOrder';
import { Routes } from '../../../../constants/routes';
import { TransactionAllType } from '../../../../constants/transaction';
import { Deposit } from '../Deposit';
import { Withdraw } from '../Withdraw';

interface Props {
  isMobile: boolean
}

enum Tab {
  Transactions = '',
  Deposits = 'deposits',
  Withdrawals = 'withdrawals',
}

const tabOrder = [Tab.Transactions, Tab.Deposits, Tab.Withdrawals];

const ProfileTransactions: FC<Props> = ({ isMobile }) => {
  const { t } = useTranslation('profile');
  const { params: { subTab } } = useRouteMatch<{ subTab: Tab }>();
  const { active, onTabChange } = useTabOrder(tabOrder, subTab, `${Routes.ProfileRoot}/transactions`);

  return (
    <Tabs active={active} onChange={onTabChange} controlled>
      <TabbedContent>
        <TabbedContent.Tabs>
          <Tabs.Head>
            <span>{t('Transactions')}</span>
            <span>{t('Deposits')}</span>
            <span>{t('Withdrawals')}</span>
          </Tabs.Head>
        </TabbedContent.Tabs>

        <TabbedContent.Content className={styles.content}>
          <Tabs.Content>
            <Transaction isMobile={isMobile} />
            <Deposit isMobile={isMobile} type={TransactionAllType.Deposit} />
            <Withdraw isMobile={isMobile} type={TransactionAllType.Withdraw} />
          </Tabs.Content>
        </TabbedContent.Content>
      </TabbedContent>
    </Tabs>
  );
};

export { ProfileTransactions };
