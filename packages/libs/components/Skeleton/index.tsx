import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface Props {
  width?: number
  height?: number
  skClass?: React.CSSProperties
}

const Skeleton: FC<Props> = ({
  width = 220, height = 280, children, skClass, 
}) => (
  <div style={{ paddingBottom: `${(height / width) * 100}%` }} className={cx(styles.wrapper, skClass)}>
    {children}
  </div>
);

export default Skeleton;
