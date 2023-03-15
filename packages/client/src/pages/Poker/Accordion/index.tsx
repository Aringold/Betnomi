import React, { FC, useState } from 'react';
import { useUserUI } from '../../../hooks/useUserUI';

import { Desktop } from './Desktop';
import { Mobile } from './Mobile';
import { useShallowSelector } from '../../../hooks';
import { selectIsSmallScreen } from '../../../store/global/selectors';

interface IProps {
  isMobile: boolean;
  type: string,
  scheme: number[]
}

const Accordion: FC<IProps> = ({ isMobile, type, scheme }) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const { isChatActive } = useUserUI();
  const isSmallScreen = useShallowSelector(selectIsSmallScreen);

  const handleCurrentState = (newSection: number) =>
    setCurrentSection((prev) => {
      if (prev === newSection && ((isSmallScreen && isChatActive) || isMobile)) return -1;
      return newSection;
    });

  return (isSmallScreen && isChatActive) || isMobile ? (
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
