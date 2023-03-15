import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import styles from './styles.module.scss';

type Props = {
  label: string;
  items: { label: string, to: string }[]
};

export const FooterNavItem: React.FC<Props> = ({ items, label }) => {
  const { t } = useTranslation('main'); 
  return (
    <div>
      <p className={styles.navLabel}>{t(label)}</p>
      <ul className={styles.navGrp}>
        {items.map((el) => (
          <li className={styles.navItem} key={el.label}>
            <NavLink to={el.to}>
              {t(el.label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  ); 
};
