import React, { FC, useState } from 'react';
import { useTranslation } from 'i18n';
import cx from 'classnames';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { SubSection } from '../SubSection';

import styles from './styles.module.scss';

interface IProps {
  handleCurrentSectionChange: () => void;
  isActive: boolean;
  subSections: number;
  index: number;
}

const Section: FC<IProps> = ({
  handleCurrentSectionChange,
  isActive,
  subSections,
  index,
}) => {
  const { t } = useTranslation('FAQ');

  const [currentSubSection, setCurrentSubSection] = useState(-1);

  const handleCurrentSubSectionChange = (newSection: number) => {
    setCurrentSubSection((prev) => {
      if (prev === newSection) return -1;
      return newSection;
    });
  };

  return (
    <div
      id={`section-${index}`}
      className={cx(styles.wrapper, { [styles.isActive]: isActive })}
    >
      <button
        onClick={handleCurrentSectionChange}
        onKeyDown={handleCurrentSectionChange}
        className={styles.action}
      >
        <div className={styles.title}>{t(`s-${index}`)}</div>
        <FontIcon name={FontIconName.ChevronDown} size={18} />
      </button>
      <div className={styles.content}>
        {Array.from(Array(subSections).keys()).map((item, subIndex) => (
          <SubSection
            key={Math.random()}
            handleCurrentSubSectionChange={() =>
              handleCurrentSubSectionChange(subIndex)}
            isActive={subIndex === currentSubSection}
            index={index}
            subIndex={subIndex}
          />
        ))}
      </div>
    </div>
  );
};

export { Section };
