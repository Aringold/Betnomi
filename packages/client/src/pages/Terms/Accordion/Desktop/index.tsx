import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from '../../../../i18n';

import { Action } from '../Action';

interface IProps {
  currentSection: number;
  handleCurrentState: (newSection: number) => void;
  scheme: number[];
  type: string
}

const Desktop: FC<IProps> = ({
  currentSection,
  handleCurrentState,
  scheme,
  type,
}) => {
  const { t } = useTranslation(type);
  const alwaysSelectedCurrentSection =
    currentSection === -1 ? 0 : currentSection;
  const handleActionClick = (item: number) => handleCurrentState(item);
  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        {scheme.map((item, index) => (
          <Action
            content={t(`${index}`)}
            actionClickHandler={() => handleActionClick(index)}
            isOpen={alwaysSelectedCurrentSection === index}
            type={type}
          />
        ))}
      </div>
      <div className={styles.content}>
        {Array.from(Array(scheme[currentSection]).keys()).map((item, index) => (
          <p
            dangerouslySetInnerHTML={{
              __html: t(`${alwaysSelectedCurrentSection}-${index}`),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { Desktop };
