import React, { FC } from 'react';
import { useTranslation } from 'i18n';
import cx from 'classnames';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';

import styles from './styles.module.scss';

interface IProps {
  handleCurrentSubSectionChange: () => void;
  isActive: boolean;
  index: number;
  subIndex: number;
}

const SubSection: FC<IProps> = ({
  handleCurrentSubSectionChange,
  isActive,
  index,
  subIndex,
}) => {
  const { t } = useTranslation('FAQ');

  return (
    <div className={cx(styles.wrapper, { [styles.isActive]: isActive })}>
      <button
        onClick={handleCurrentSubSectionChange}
        onKeyDown={handleCurrentSubSectionChange}
        className={styles.action}
      >
        <div className={styles.title}>{t(`s-${index}-${subIndex}-t`)}</div>
        <FontIcon name={FontIconName.Plus} size={18} />
      </button>
      <div className={styles.content}>
        {' '}
        <p
          dangerouslySetInnerHTML={{
            __html: t(`s-${index}-${subIndex}`),
          }}
        />
      </div>
    </div>
  );
};

export { SubSection };
