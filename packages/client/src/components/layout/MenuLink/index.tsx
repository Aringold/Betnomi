import React from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

export interface MenuLinkOptions {
  icon?: FontIconName;
  to: string;
  label: string;
  long?: boolean;
  itemOffset?: number;
}

interface Props extends MenuLinkOptions {
  onClick?: () => void;
}

export const MenuLink:React.FC<Props> = ({
  icon, to, label, long, itemOffset, onClick,
}) => (
  <NavLink
    to={to}
    exact
    activeClassName={styles.activeLink} 
    className={cx(styles.link, { [styles.active]: !long })}
    onClick={onClick}
  >
    <div className={styles.text_wrap}>
      {icon && (
      <FontIcon
        name={icon}
        size={long ? 16 : 24}
        className={cx(styles.icon, { [styles.active]: long })}
      />
      )}
      <span
        className={cx(
          styles.text, 
          { [styles.active]: long },
        )}
        style={{ marginLeft: itemOffset }}
      >
        {label}
      </span>
    </div>
  </NavLink>
);
