import React, { useContext } from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useIntercom } from 'react-use-intercom';
import { useLocation } from 'react-router-dom';
import { Routes } from 'constants/routes';
import styles from './styles.module.scss';
import { SupportContext } from '../Support';

export interface MenuSupportOptions {
  long?: boolean;
  label: string;
  itemOffset?: number;
}

interface Props extends MenuSupportOptions {}

export const MenuSupport:React.FC<Props> = ({ long, itemOffset }) => {
  const isOpen = useContext(SupportContext);
  const {
    hide, show,
  } = useIntercom();
  const location = useLocation();

  const handleOnClick = () => {
    if (location.pathname !== Routes.Homepage) {
      return;
    }
    if (isOpen) { 
      hide();
    } else {
      show(); 
    }
  };

  return (
    <button onClick={handleOnClick} className={styles.wrapper}>
      <div className={styles.text_wrap}>
        <FontIcon
          name={FontIconName.Support}
          size={long ? 16 : 24}
          className={cx(styles.icon, { [styles.active]: long })}
        />
        <span
          className={cx(
            styles.text, 
            { [styles.active]: long },
          )}
          style={{ marginLeft: itemOffset }}
        >
          Support
        </span>
      </div>
    </button>
  );
};
