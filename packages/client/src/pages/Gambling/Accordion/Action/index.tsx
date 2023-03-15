import React, { FC } from 'react';
import cx from 'classnames';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import styles from './styles.module.scss';
import { useTranslation } from '../../../../i18n';

interface IProps {
  content: string;
  isOpen?: boolean;
  actionClickHandler?: () => void;
  type: string
}

const Action: FC<IProps> = ({
  content, isOpen, actionClickHandler, type,
}) => {
  const { t } = useTranslation(type);

  return (
    <button
      className={cx(styles.wrapper, { [styles.isOpen]: isOpen })}
      onClick={actionClickHandler}
      onKeyDown={actionClickHandler}
    >
      <div>{t(content)}</div>
      <FontIcon name={FontIconName.ArrowRight} size={16} />
    </button>
  );
};

export { Action };
