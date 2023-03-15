import React, { FC, MouseEventHandler } from 'react';
import { IconButton } from '@betnomi/libs/components/IconButton';
import { ButtonColor } from '@betnomi/libs/types';
import classNames from 'classnames';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import styles from './styles.module.scss';

interface IProps {
  onClick?: MouseEventHandler;
  active?: boolean;
  icon: FontIconName;
  className?: string;
  badge?: number;
}

const HeaderToggleButton: FC<IProps> = ({
  onClick, active, icon, className, badge,
}) => {
  const button = (
    <IconButton
      name={icon}
      color={ButtonColor.Secondary}
      onClick={onClick}
      className={classNames({ [styles.active]: active }, className)}
    />
  );
  return badge && badge > 0 ? (
    <div className={styles.badgeContainer}>
      {button}
      <div className={styles.badge}>{badge}</div>
    </div>
  ) : button;
};

export { HeaderToggleButton };
