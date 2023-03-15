/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useState } from 'react';
import { useFocusEvent } from '@betnomi/libs/hooks/useFocusEvent';
import { usePopperDropdown } from '@betnomi/libs/hooks/ui/usePopperDropdown';
import { Manager, Popper, Reference } from 'react-popper';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import cx from 'classnames';
import { ReactComponent as CopyIcon } from '@betnomi/libs/assets/img/icons/copy.svg';
import { useTranslation } from '@betnomi/client/src/i18n';

import styles from './styles.module.scss';

interface Props {
  text: string;
  icon?: any;
  className?: string;
}

const CopyPopover: FC<Props> = ({ text, icon = <CopyIcon width={16} height={16} />, className }) => {
  const {
    focused, onBlur, onFocus,
  } = useFocusEvent();
  const modifiers = usePopperDropdown(0, 10);
  const [copyActive, setCopyActive] = useState(false);
  const { t } = useTranslation('profile');

  const handleCopied = () => {
    setCopyActive(true);

    setTimeout(() => {
      onBlur();
      setCopyActive(false);
    }, 3000);
  };

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <CopyToClipboard text={text} onCopy={handleCopied}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                onFocus();
              }}
              onMouseEnter={onFocus}
              onMouseLeave={onBlur}
              ref={ref}
              className={cx(styles.copyWrap, className)}
            >
              {copyActive ? <FontIcon size={16} name={FontIconName.Checked} className={styles.notice_icon} /> : icon }
            </div>
          </CopyToClipboard>
        )}
      </Reference>
      {focused ? (
        <Popper placement="top" modifiers={modifiers}>
          {({
            ref, style, placement, arrowProps,
          }) => (
            <div className={styles.floating} ref={ref} style={style} data-placement={placement}>
              {copyActive ? t('Copied') : t('Click to copy')}
              <div ref={arrowProps.ref} style={arrowProps.style} className={styles.arrow} data-popper-arrow />
            </div>
          )}
        </Popper>
      ) : null}
    </Manager>
  );
};

export { CopyPopover };
