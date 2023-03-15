import React from 'react';
import {
  about, help, statistics, regulations, 
} from './constants';
import { FooterNavItem } from '../FooterNavItem';
import { useShallowSelector } from '../../../hooks';
import { selectAuthUI } from '../../../store/auth/selectors';
import styles from './styles.module.scss';

const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1199px)').matches;
export const FooterNav: React.FC = () => {
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  return (
    <nav className={smallScreen && (isChatActive || isMenuActive) ? styles.navBase : styles.nav}>
      <FooterNavItem label="About" items={about} />
      <FooterNavItem label="Help" items={help} />
      <FooterNavItem label="Statistics" items={statistics} />
      <FooterNavItem label="Regulations" items={regulations} />
    </nav>
  );
};
