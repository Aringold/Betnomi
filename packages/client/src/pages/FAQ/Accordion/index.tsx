import React, { FC, useState, useEffect } from 'react';
import { Section } from './Section';

import styles from './styles.module.scss';

interface IProps {}

const scheme = [14, 28, 5, 5];

const Accordion: FC<IProps> = () => {
  const [currentSection, setCurrentSection] = useState(-1);

  useEffect(() => {
    const sectionHeight = document.getElementById(`section-${currentSection}`)
      ?.offsetTop;

    if (sectionHeight) window.scrollTo(0, sectionHeight - 100);
  }, [currentSection]);

  const handleCurrentSectionChange = (newSection: number) => {
    setCurrentSection((prev) => {
      if (prev === newSection) return -1;
      return newSection;
    });
  };

  return (
    <div className={styles.wrapper}>
      {scheme.map((item, index) => (
        <Section
          key={Math.random()}
          handleCurrentSectionChange={() => handleCurrentSectionChange(index)}
          isActive={currentSection === index}
          subSections={item}
          index={index}
        />
      ))}
    </div>
  );
};

export { Accordion };
