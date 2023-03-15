import { MenuButtonItem } from 'components/layout/LanguageSwitch';
import { MenuLabelOptions } from '../../../components/layout/MenuLabel';
import { MenuLinkOptions } from '../../../components/layout/MenuLink';
import { MenuGroupOptions } from '../../../components/layout/MenuGroup';
import { MenuLineOptions } from '../../../components/layout/MenuLine';
import { MenuToolTipOptions } from '../../../components/layout/MenuToolTip';
import { MenuSupportOptions } from '../../../components/layout/MenuSupport';

export enum MenuItemType {
  Link = 'link',
  Line = 'line',
  Group = 'group',
  Label = 'label',
  ToolTip = 'tooltip',
  Button = 'button',
  Support = 'support',
}

export type MenuItem = {
  type: MenuItemType.Link,
  options: MenuLinkOptions,
  hide: boolean,
} | {
  type: MenuItemType.Line,
  options: MenuLineOptions,
  hide: boolean,
} | {
  type: MenuItemType.Group,
  options: MenuGroupOptions,
  hide: boolean,
} | {
  type: MenuItemType.Label,
  options: MenuLabelOptions,
  hide: boolean,
} | {
  type: MenuItemType.ToolTip,
  options: MenuToolTipOptions,
  hide: boolean,
} | {
  type: MenuItemType.Support,
  options: MenuSupportOptions,
  hide: boolean,
} | MenuButtonItem;
