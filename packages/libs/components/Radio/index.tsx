import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

export const RadioButton: React.FC<Props> = ({ isChecked, onCheck }) => (
  <button className={cx(styles.container, { [styles.checked]: isChecked })} onClick={onCheck}>
    {isChecked ? <div className={styles.circle} /> : null}
  </button>
);
