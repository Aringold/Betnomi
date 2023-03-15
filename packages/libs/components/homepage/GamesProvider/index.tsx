/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';

import { useRouteMatch } from 'react-router-dom';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { IconTab } from '@betnomi/libs/components/tabs/IconTab';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { Table } from '@betnomi/libs/components/Table';
import { Routes } from '@betnomi/client/src/constants/routes';
import { Authorized } from '@betnomi/client/src/containers/app/Authorized';
import Skeleton from '@betnomi/libs/components/Skeleton';
import { borderRadius } from 'react-select/src/theme';
import { useTabOrder } from '../../../../client/src/hooks/useTabOrder';
import { TabsSelect } from '../../TabsSelect';
import styles from './styles.module.scss';
import WagerContest from '../WagerContest';
import { columns, columnsMediumMobile, columnsMobile } from './betsTableInformation';
import { useShallowSelector } from '../../../../client/src/hooks';
import { latestBets } from '../../../../client/src/store/latestBets/selectors';
import { fetchBets } from '../../../../client/src/store/latestBets/actionCreators';

interface GameProvider {
  isMobile:boolean;
}

enum Tab {
  Profile = 'kyc',
  Wallet = 'wallet',
  Bets = 'bets',
  Transactions = 'transactions',
  VIP = 'vip',
  Bonuses = 'bonuses',
}

const tabOrder = [Tab.Profile, Tab.Wallet, Tab.Bets];

const GameProvider = ({ isMobile }: GameProvider) => {
  const dispatch = useDispatch();
  const { params: { tab } } = useRouteMatch<{ tab: Tab }>();
  const [active, setActive] = useState(0);
  const latestBetsData = useShallowSelector(latestBets);
 
  useEffect(() => {
    if (latestBetsData.length === 0) {
      dispatch(fetchBets());
    }
  }, []);

  const data = [...latestBetsData];
  data.map((item: any) => {
    item.bet = { value: item.betAmount, name: item.currency };
    item.payoutValue = { value: item.payout, name: item.currency };
    return item;
  });
  const onTabChange = (a: any) => {
    setActive(a);
  };

  const smallScreen = window.matchMedia(
    '(min-width:450px) and (max-width: 768px)',
  ).matches;

  return (
    <Tabs active={active} onChange={onTabChange} controlled>
      <div className={styles.page}>
        <div className={styles.head}>
          {!isMobile && (
            <div className={styles.tabs}>
              <Tabs.Head className={styles.mainTab}>
                <h4 className={styles.heading}>Latest Bets</h4>
                <h4 className={styles.heading}>High Rollers</h4>
              </Tabs.Head>
            </div>
          )}
          
          {isMobile && (
            <div className={styles.mobileTabs}>
              <Tabs.Head className={styles.mainTab}>
                <h4 className={styles.heading}>Latest Bets</h4>
                <h4 className={styles.heading}>High Rollers</h4>
              </Tabs.Head>
            </div>
          )}
        </div>
      </div>

      <div>
        <Tabs.Content>
          {data?.length !== 0 ? <Table data={data} columns={isMobile ? smallScreen ? columnsMediumMobile : columnsMobile : columns} tableClassName={cx({ [styles.tableScr]: smallScreen })} />
            : <Skeleton height={300} width={1400} skClass={styles.tableSkeleton} /> }
          {isMobile ? <div>Sports Screen</div> : <WagerContest isMobile={isMobile} />}
        </Tabs.Content>
      </div>
    </Tabs>
  );
};

export default GameProvider;
