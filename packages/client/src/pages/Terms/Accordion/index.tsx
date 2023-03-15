import React, { FC, useState } from 'react';
import useResize from '@betnomi/libs/hooks/useResize';
import { useUserUI } from '../../../hooks/useUserUI';

import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

interface IProps {
  isMobile: boolean;
  type: string,
  scheme: number[]
}

const Accordion: FC<IProps> = ({ isMobile, type, scheme }) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const { width } = useResize();
  const { isChatActive } = useUserUI();
  const handleCurrentState = (newSection: number) =>
    setCurrentSection((prev) => {
      if (prev === newSection && ((width < 1400 && isChatActive) || isMobile)) return -1;
      return newSection;
    });

  return (width < 1400 && isChatActive) || isMobile ? (
    <Mobile
      currentSection={currentSection}
      handleCurrentState={handleCurrentState}
      scheme={scheme}
      type={type}
    />
  ) : (
    <Desktop
      currentSection={currentSection}
      handleCurrentState={handleCurrentState}
      scheme={scheme}
      type={type}
    />
  );
};

export { Accordion };
