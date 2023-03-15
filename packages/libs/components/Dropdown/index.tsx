import React, {
  FC, ReactNode, useEffect, useRef, 
} from 'react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import { Placement } from '@popperjs/core';
import { usePopperToggle } from '@betnomi/libs/hooks/usePopperToggle';
import styles from './styles.module.scss';

interface IProps {
  label: ReactNode;
  offset?: number;
  placement?: Placement;
  deps?: any[];
  delay?: number;
}

const Dropdown: FC<IProps> = ({
  label, placement, offset = 0, children, 
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef(null);

  const { visible, handleDocumentClick, handleDropdownClick } = usePopperToggle(
    btnRef,
  );

  const popperProps = usePopper(btnRef.current, popperRef.current, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, offset],
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
        ref={btnRef}
        onClick={() => {
          if (popperProps.update) {
            popperProps.update();
          }
          handleDropdownClick();
        }}
        type="button"
        className={styles.button}
      >
        {label}
      </button>

      <div
        ref={popperRef}
        style={popperProps.styles.popper}
        className={classNames(styles.popper, { [styles.hidden]: !visible })}
        {...popperProps.attributes.popper}
      >
        {children}
      </div>
    </>
  );
};

export { Dropdown };
