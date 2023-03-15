import React, { useContext } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import cx from 'classnames';
import { useIntercom } from 'react-use-intercom';
import { useShallowSelector } from '../../../../hooks';
import { selectAuthUI } from '../../../../store/auth/selectors';

import styles from './styles.module.scss';
import { SupportContext } from '..';

type Props = {};

export const DesktopButton: React.FC<Props> = () => {
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const isOpen = useContext(SupportContext);
  const { hide, show } = useIntercom();

  const handleOnClick = () => (isOpen ? hide() : show());

  return (
    <button
      onClick={handleOnClick}
      className={cx(styles.desktopWrapper, {
        [styles.isChatActive]: isChatActive,
      })}
    >
      <FontIcon name={FontIconName.Support} size={16} />
    </button>
  );
};
