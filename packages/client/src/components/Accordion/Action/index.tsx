import React, { FC } from 'react';
import cx from 'classnames';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import styles from './styles.module.scss';

interface IProps {
  content: string;
  isOpen?: boolean;
  actionClickHandler?: () => void;
}

const Action: FC<IProps> = ({
  content, isOpen, actionClickHandler,
}) => (
  <button
    className={cx(styles.wrapper, { [styles.isOpen]: isOpen })}
    onClick={actionClickHandler}
    onKeyDown={actionClickHandler}
  >
    <div>{content}</div>
    <FontIcon name={FontIconName.ArrowRight} size={16} />
  </button>
);

export { Action };
