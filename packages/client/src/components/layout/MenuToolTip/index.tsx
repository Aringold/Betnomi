import React from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import styles from './styles.module.scss';

export interface MenuToolTipOptions {
  icon?: FontIconName;
  label: string;
  long?: boolean;
  itemOffset?: number;
  text: string;
}

interface Props extends MenuToolTipOptions {
  onClick: ()=> void;
}

export const MenuToolTip:React.FC<Props> = ({
  icon, label, long, itemOffset, text, onClick,
}) => (
// eslint-disable-next-line
  <div className={styles.tooltip} onClick={onClick}>  
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
    <div className={styles.tootlipContent}>{text}</div>
  </div>
);
