import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUserUI } from 'hooks/useUserUI';
import { Modal } from '../../../components/modal/Modal';
import { MainRouter } from '../MainRouter';
import { useScript } from '../../../hooks/useScript';
import { ScrollToTop } from '../../../components/common/ScrollToTop';
import {
  setIsMobile,
  setIsSmallScreen,
} from '../../../store/global/actionCreators';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const App = () => {
  const dispatch = useDispatch();
  const { setIsChatActive } = useUserUI();
  useScript(
    'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js',
  );

  const handleResize = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isSmallScreen = window.matchMedia(
      '(min-width:768px) and (max-width: 1440px)',
    ).matches;
    dispatch(setIsMobile({ isMobile }));
    dispatch(setIsSmallScreen({ isSmallScreen }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) setIsChatActive(true);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Modal />
      <MainRouter />
    </>
  );
};

export { App };
