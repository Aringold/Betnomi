import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface IGradient {
  state: boolean;
}

const Gradient: React.FC<IGradient> = ({ state }) => (
  <div className={cx(styles.gradient, { [styles.active]: state })} />
);

export default Gradient;
