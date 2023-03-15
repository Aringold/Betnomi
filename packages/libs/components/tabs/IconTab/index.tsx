import React, { FC } from 'react';
import { FontIcon, FontIconName } from '../../FontIcon';
import styles from './styles.module.scss';

interface Props {
  icon: FontIconName
  className?: string
}

const IconTab: FC<Props> = ({ children, icon, className }) => (
  <div className={styles.tab}>
    <FontIcon name={icon} size={24} />
    <span className={className}>{children}</span>
  </div>
);

export { IconTab };
