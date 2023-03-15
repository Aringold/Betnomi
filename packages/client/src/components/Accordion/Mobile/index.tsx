import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';

import { Action } from '../Action';

interface IProps {
  currentSection: number;
  handleCurrentState: (newSection: number) => void;
  scheme: number[];
  type: string
}

const Mobile: FC<IProps> = ({
  currentSection, handleCurrentState, scheme, type, 
}) => {
  const { t } = useTranslation(type);

  const handleActionClick = (item: number) => handleCurrentState(item);
  return (
    <div className={styles.wrapper}>
      {scheme.map((item, index) => (
        <div key={index.toString()}>
          <Action
            content={t(`${index}`)}
            actionClickHandler={() => handleActionClick(index)}
            isOpen={currentSection === index}
          />
          <div
            className={cx(styles.content, {
              [styles.isOpen]: index === currentSection,
            })}
          >
            {[...Array(item).keys()].map((subItem, subIndex) => (
              <p
                dangerouslySetInnerHTML={{
                  __html: t(`${index}-${subIndex}`),
                }}
                key={subIndex.toString()}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Mobile };
