import React, { FC, useEffect } from 'react';
import { useUserUI } from 'hooks/useUserUI';
import Games from '../../containers/homepage/Games';
import { useShallowSelector } from '../../hooks';
import { selectIsMobile, selectIsSmallScreen } from '../../store/global/selectors';
import styles from './styles.module.scss';

interface IProps {}
const Homepage: FC<IProps> = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const isSmallScreen = useShallowSelector(selectIsSmallScreen);
  const { setIsChatActive } = useUserUI();
  
  useEffect(() => {
    const isMobileByCSS = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobileByCSS) setIsChatActive(true);
  }, []);
  return (
    <div className={isSmallScreen ? styles.pageSmallScreen : styles.page}>
      <Games isMobile={isMobile} />
    </div>
  );
};

export default Homepage;
