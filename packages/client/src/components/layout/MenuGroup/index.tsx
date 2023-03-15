/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect, useRef, 
} from 'react';
import cx from 'classnames';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { usePopper } from 'react-popper';
import { usePopperToggle } from '@betnomi/libs/hooks/usePopperToggle';
import { MenuItemType } from '../../../types/ui/menu';
import { MenuLink, MenuLinkOptions } from '../MenuLink';
import { MenuButtonItem } from '../LanguageSwitch';
import styles from './styles.module.scss';

type Item = {
  type: MenuItemType.Link
  options: MenuLinkOptions;
} | MenuButtonItem;

export interface MenuGroupOptions {
  icon?: FontIconName;
  label: string;
  long?: boolean;
  items: Item[];
  classNameContainer?: string;
  classNameLabel?: string;
  showArrow?: boolean;
  shortLabel?: string;
  isMobile?: boolean;
  hidePopper?: boolean;
}

const POPPER_OFFSET_LONG = 40;
const POPPER_OFFSET_SHORT = 30;

export const MenuGroup:React.FC<MenuGroupOptions> = ({
  icon, long, label, items,
  classNameContainer,
  classNameLabel,
  showArrow = long,
  shortLabel,
  isMobile,
  hidePopper,
}) => {
  const { t } = useTranslation('main');
  const title = t(label);

  const btnRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef(null);

  const itemOffset = 0;

  const { visible, handleDocumentClick, handleDropdownClick } = usePopperToggle(btnRef);

  const popperProps = usePopper(btnRef.current, popperRef.current, {
    placement: 'right-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, long ? POPPER_OFFSET_LONG : POPPER_OFFSET_SHORT],
        },
      },
    ],
  });

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <button
        className={cx(
          styles.button,
          { [styles.active]: !long },
          classNameContainer,
        )}
        onClick={() => {
          if (hidePopper) {
            return;
          }
          if (popperProps.update) {
            popperProps.update();
          }
          handleDropdownClick();
        }}
        ref={btnRef}
      >
        <div className={styles.text_wrap}>
          {icon && (
            <FontIcon
              name={icon}
              size={long ? 16 : 24}
              className={cx(styles.icon)}
            />
          )}
          <span className={cx(styles.text, { [styles.active]: long }, classNameLabel)}>
            {title}
          </span>
          <span className={cx(styles.short_label, { [styles.active]: !long })}>
            {shortLabel}
          </span>
        </div>
        <div className={cx(styles.arrow, { [styles.disabled]: !showArrow })}>
          <FontIcon
            name={FontIconName.IconArrowBottom}
            size={12}
          />
        </div>

      </button>

      {isMobile && (
        <ul
          className={cx(styles.items, { [styles.hidden]: !visible })}
        >
          {items.map((item) => {
            if (item.type === MenuItemType.Button) {
              return (
                <button
                  key={item.options.label}
                  onMouseDown={item.options.onClick}
                  className={styles.button_lang}
                >
                  {item.options.label}
                </button>
              );
            }
            return (
              <MenuLink
                long
                key={item.options.label}
                to={item.options.to}
                label={item.options.label}
              />
            );
          })}
        </ul>
      )}

      {!isMobile && (
        <ul
          className={cx(styles.items, { [styles.hidden]: !visible })}
          ref={popperRef}
          onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
          style={popperProps.styles.popper}
          {...popperProps.attributes.popper}
        >
          {items.map((item) => {
            if (item.type === MenuItemType.Button) {
              return (
                <button
                  key={item.options.label}
                  onMouseDown={item.options.onClick}
                  className={styles.button_lang}
                >
                  {item.options.label}
                </button>
              );
            }
            return (
              <MenuLink
                long
                key={item.options.label}
                to={item.options.to}
                label={item.options.label}
                itemOffset={itemOffset}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
