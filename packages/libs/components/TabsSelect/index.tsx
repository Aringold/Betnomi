/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, {
  PropsWithChildren, useState, useCallback, useEffect, useMemo, FC, useRef,
} from 'react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import { usePopperToggle } from '@betnomi/libs/hooks/usePopperToggle';
import { FontIcon, FontIconName } from '../FontIcon';
import { TextInputWrap } from '../TextInputWrap';
import { usePopperDropdown } from '../../hooks/ui/usePopperDropdown';
import styles from './styles.module.scss';

interface ContainerProps extends PropsWithChildren<any> {
  active: number;
  onChange: (val: number) => void;
  controlled?: boolean;
}

interface ValueProps {
  value: string;
  icon: FontIconName;
}

function TabsSelect({
  active = 0,
  onChange = () => {},
  children,
  controlled,
}: ContainerProps) {
  const [current, setCurrent] = useState(active);
  const handleChange = useCallback(
    (val: number) => {
      const indexTab = children.findIndex((child: any) => child.props.value === val);
      onChange(indexTab);
  
      if (controlled) {
        return;
      }
  
      setCurrent(val);
    },
    [setCurrent, onChange, controlled],
  );

  useEffect(() => {
    setCurrent(active);
  }, [active]);

  const pages = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );
  const modifiers = usePopperDropdown(0, 10, true);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef(null);

  const { visible, handleDocumentClick, handleDropdownClick } = usePopperToggle(btnRef);

  const popperProps = usePopper(btnRef.current, popperRef.current, {
    placement: 'bottom-start',
    modifiers,
  });

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <TextInputWrap className={styles.specifiv}>
        <button className={styles.select} type="button" ref={btnRef} onClick={handleDropdownClick}>
          {pages[current]}
          <FontIcon name={FontIconName.IconArrowBottom} className={styles.arrow_icon} size={16} />
        </button>
      </TextInputWrap>
      <div
        className={classNames(styles.float, { [styles.hidden]: !visible })}
        ref={popperRef}
        style={popperProps.styles.popper}
      >
        {children.filter((child: FC) => child !== pages[current]).map((child: any) => (
          <button className={styles.button} key={child.props.value} onClick={() => handleChange(child.props.value)}>
            {child}
          </button>
        ))}
      </div>

    </>
  );
}
const Value: FC<ValueProps> = ({ value, icon }) => (
  <div className={styles.tab}>
    <FontIcon name={icon} size={24} />
    <span>{value}</span>
  </div>
); 

TabsSelect.Value = Value;

export { TabsSelect };
