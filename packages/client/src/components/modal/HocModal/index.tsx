import React from 'react';
import ClassNames from 'classnames';
import { ModalHeader } from '../ModalHeader';
import styles from './styles.module.scss';

type Props = {
  onClose?: () => void;
  title?: JSX.Element | string;
  className?: string;
  style?: React.CSSProperties;
};

export const HocModal: React.FC<Props> = ({
  children, onClose, 
  title,
  className,
  style,
}) => (
  <div style={style} className={ClassNames(styles.out, className)}>
    <ModalHeader onClose={onClose}>
      {title}
    </ModalHeader>
    {children}
  </div>
);
