import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { MenuItem, MenuItemType } from '../../../../types/ui/menu';

export const menuItems = (isMobile: boolean):MenuItem[] => [
  // {
  //   type: MenuItemType.Label,
  //   options: {
  //     label: 'Sport',
  //     labelShort: 'Sport',
  //     long: false,
  //   },
  // },
  // {
  //   type: MenuItemType.Link,
  //   options: {
  //     to: '/live-sports',
  //     label: 'Live Sports',
  //     icon: FontIconName.LiveCasinoPlay,
  //   },
  // },
  // {
  //   type: MenuItemType.Link,
  //   options: {
  //     to: '/starting-soon',
  //     label: 'Starting Soon',
  //     icon: FontIconName.Football,
  //   },
  // },
  // {
  //   type: MenuItemType.Link,
  //   options: {
  //     to: '/boosted-odds',
  //     label: 'Boosted Odds',
  //     icon: FontIconName.OddsNew,
  //   },
  // },
  // NEXT GROUP
  // {
  //   type: MenuItemType.Label,
  //   options: {
  //     label: 'Casino and Live',
  //     labelShort: 'Casino',
  //     long: true,
  //   },
  // },
  // SubCategories example ---
  // {
  //   type: MenuItemType.Group,
  //   options: {
  //     label: 'House Games',
  //     icon: FontIconName.House,
  //     items: [
  //       {
  //         type: MenuItemType.Link,
  //         options: {
  //           to: '/#',
  //           label: 'Text3',
  //         },
  //       },
  //       {
  //         type: MenuItemType.Link,
  //         options: {
  //           to: '/#',
  //           label: 'Text4',
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    type: MenuItemType.ToolTip,
    options: {
      label: 'Sports',
      icon: FontIconName.Football,
      text: 'Coming Soon ... ',
    },
    hide: false,
  },
  // {
  //   type: MenuItemType.Link,
  //   options: {
  //     to: '/starting-soon',
  //     label: 'Sports',
  //     icon: FontIconName.Football,
  //   },
  // },
  {
    type: MenuItemType.Link,
    options: {
      to: '/casino',
      label: 'Slots',
      icon: FontIconName.Casino,
    },
    hide: false,
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/live-casino',
      label: 'All Live Games',
      icon: FontIconName.Roulette,
    },
    hide: false,
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/game/5000000',
      label: 'Blast',
      icon: FontIconName.Blast,
    },
    hide: false,
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/games',
      label: 'House Games',
      icon: FontIconName.House,
    },
    hide: false,
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/live-casino/28',
      label: 'Poker Room',
      icon: FontIconName.Poker,
    },
    hide: false,
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/game/27117',
      label: 'Mines',
      icon: FontIconName.Mines,
    },
    hide: false,
  },
  {
    type: MenuItemType.Line,
    options: {
      label: 'line1',
    },
    hide: false,
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/affiliate',
      label: 'Affiliates',
      icon: FontIconName.Affiliates,
    },
    hide: false,
  },
  {
    type: MenuItemType.Support,
    options: {
      label: 'Support',
    },
    hide: isMobile,
  },
  // NEXT GROUP
  // {
  //   type: MenuItemType.Link,
  //   options: {
  //     to: '/promotions',
  //     label: 'Promotions',
  //     icon: FontIconName.Promo,
  //   },
  // },
];
