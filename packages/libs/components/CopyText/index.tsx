import React from 'react';
import cx from 'classnames';
import { CopyPopover } from '@betnomi/client/src/components/common/CopyPopover';
import { ReactComponent as CopyIcon } from '@betnomi/libs/assets/img/icons/copy.svg';

import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectAuthUI } from '@betnomi/client/src/store/auth/selectors';
import styles from './styles.module.scss';

type Props = {
  text: string;
  disabled?: boolean;
  onCopy?: () => void;
  className?: string;
};

export const CopyText: React.FC<Props> = ({
  text, disabled, className,
}) => {
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const midScreen = window.matchMedia('(min-width:1023px) and (max-width: 1201px)').matches;
  return (
    <div 
      style={(midScreen && isChatActive) || (midScreen && isMenuActive) ? { flexDirection: 'column', gridRowGap: '5px' } : null}
      className={cx(
        styles.container, 
        { [styles.disabled]: disabled },
      )}
    >
      <div className={styles.text}>{text}</div>
      <CopyPopover icon={<CopyIcon width={16} height={16} />} text={text} className={className} />
    </div>
  );
};
