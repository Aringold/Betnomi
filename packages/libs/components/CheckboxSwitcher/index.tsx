import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  checked: boolean;
  onCheck: (val: boolean) => void;
  className?: string;
  hasError?: boolean;
}

const CheckboxSwitcher: FC<IProps> = ({
  checked, onCheck, className,
}) => {
  const onMouseDown = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    onCheck(!checked);
  }, [checked]);

  return (
    <button
      className={classNames(styles.checkbox, className, { [styles.checked]: checked })}
      onMouseDown={onMouseDown}
      type="button"
    >
      <div className={styles.point} />
    </button>
  );
};

export { CheckboxSwitcher };
