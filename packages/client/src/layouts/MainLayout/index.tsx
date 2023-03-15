import React, {
  FC, useCallback, useEffect, useRef, useState, useMemo,
} from 'react';
import cx from 'classnames';
import { CoinType } from '@betnomi/libs/types';
import { useDispatch } from 'react-redux';
import { generatePath, useHistory, useLocation } from 'react-router-dom';
import { selectIsMobile, selectIsSmallScreen } from 'store/global/selectors';
import { useModal } from 'hooks/useModal';
import { ModalType } from 'store/modal/types';
import { useChat } from 'hooks/useChat';
import { selectLastSeenMessageIndex } from 'store/chat/selectors';
import { debounce } from 'lodash';
import { ShowMore } from '../../components/home/ShowMore';
import { Chat } from '../../containers/chat/Chat';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/home/Footer';
import { Menu } from '../../components/layout/Menu';
import { MobileMenu } from '../../components/layout/MobileMenu';
import { useUser } from '../../hooks/useUser';
import { useShallowSelector } from '../../hooks';
import { selectAuth } from '../../store/auth/selectors';
import {
  authLogout,
  authSelectCurrency,
} from '../../store/auth/actionCreators';
import { modalShow } from '../../store/modal/actionCreators';
import { useUserUI } from '../../hooks/useUserUI';
import { useRates } from '../../hooks/money/useRates';
import { Routes } from '../../constants/routes';
import { affiliateSetReferralCode } from '../../store/affiliate/actionCreators';
import styles from './styles.module.scss';

const MainLayout: FC = ({ children }) => {
  const isMobile = useShallowSelector(selectIsMobile);
  const dispatch = useDispatch();
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);

  const {
    isChatActive,
    isMenuActive,
    isShowMoreActive,
    setIsMenuActive,
    setIsChatActive,
    setIsShowMoreActive,
  } = useUserUI();
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const {
    isAuthorized,
    progress,
    name,
    level,
    confirmed,
    image,
    balances,
    bcCurrency,
  } = useUser();
  const { currency } = useShallowSelector(selectAuth);
  const isSmallScreen = useShallowSelector(selectIsSmallScreen);
  const lastSeenMessageIndex = useShallowSelector(selectLastSeenMessageIndex);
  const { messages } = useChat();
  const location = useLocation();

  const { current: currentModal, showModal, active } = useModal();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const setUnreadMessagesCountDebounce = useCallback(debounce(setUnreadMessagesCount, 500), []);
  const isChatEnabled = useMemo(() => location.pathname !== Routes.PromotionsLanding, [location]);

  useEffect(() => {
    if (!isChatEnabled && isChatActive && !isMobile) {
      setIsChatActive(false);
    }
  }, [isChatEnabled, isChatActive]);

  useEffect(() => {
    setUnreadMessagesCountDebounce(lastSeenMessageIndex !== undefined ? messages.length - lastSeenMessageIndex - 1 : 0);
  }, [lastSeenMessageIndex, messages.length]);

  useEffect(() => {
    const updateHeight = () => {
      if (rightRef.current && headerRef.current) {
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        rightRef.current.style.height = `${window.innerHeight - headerHeight}px`;
        rightRef.current.style.top = `${headerHeight}px`;
      }
    };
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (!currentModal && bcCurrency === 'UNKNOWN') {
      showModal(ModalType.FiatCurrency)();
    } 
  }, [bcCurrency, currentModal]);

  const onChangeCoin = useCallback(
    (coin: CoinType) => dispatch(authSelectCurrency(coin)),
    [],
  );

  const onLogout = () => {
    dispatch(authLogout());
    history.push('/');
  };

  const onOpenSignInModal = useCallback(
    () => {
      dispatch(modalShow(ModalType.SignIn));
      setIsMenuActive(false);
    }, [dispatch],
  );

  const onOpenSignUpModal = useCallback(
    () => {
      dispatch(modalShow(ModalType.SignUp));
      setIsMenuActive(false);
    }, [dispatch],
  );

  const { rates } = useRates();
  const { push } = useHistory();
  const onDepositClick = useCallback(() => {
    push(`${Routes.Profile}/wallet/deposit`);
  }, [push]);

  const openSettings = () => {
    push(generatePath(Routes.Profile, { tab: 'settings' }));
    showModal(ModalType.ManageCurrency)();
  };

  useEffect(() => {
    if (isSmallScreen && isMenuActive && isChatActive) {
      setIsMenuActive(false);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    setIsShowMoreActive(true);
  }, []);

  useEffect(() => {
    if (!active) {
      document.body.style.overflow = isMobile && isMenuActive ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isMenuActive, isMobile]);

  useEffect(() => {
    if (queryParams.get('ref') !== null) {
      dispatch(affiliateSetReferralCode({
        url: String(queryParams.get('ref')),
        active: true,
      }));
      onOpenSignUpModal();
    }
  }, []);

  return (
    <div
      className={cx(
        styles.container,
        { [styles.chat_active]: isChatActive },
        { [styles.menu_active]: isMenuActive },
      )}
    >
      <div ref={headerRef} className={styles.header}>
        <Header
          isAuthorized={isAuthorized}
          menuActive={isMenuActive}
          chatActive={isChatActive}
          notificationActive={isNotificationActive}
          onMenuToggle={setIsMenuActive}
          onChatToggle={isChatEnabled ? setIsChatActive : () => {}}
          onNotificationToggle={setIsNotificationActive}
          onChangeCoin={onChangeCoin}
          balances={balances}
          rates={rates}
          selectedCoin={currency}
          image={image}
          progress={progress}
          name={name}
          confirmed={confirmed}
          level={level}
          onLogout={onLogout}
          onOpenSignInModal={onOpenSignInModal}
          onOpenSignUpModal={onOpenSignUpModal}
          onDepositClick={onDepositClick}
          onSettingsClick={openSettings}
          isMobile={isMobile}
          unreadMessagesCount={unreadMessagesCount}
        />
      </div>

      <div className={cx(isMobile ? styles.mobilemenu : styles.left, { [styles.active]: isMenuActive })}>
        <Menu
          onMenuToggle={setIsMenuActive}
          menuActive={isMenuActive}
          isMobile={isMobile}
        />
      </div>

      {isMobile && !isChatActive ? (
        <MobileMenu
          onMenuToggle={setIsMenuActive}
          menuActive={isMenuActive}
          chatActive={isChatActive}
          onChatToggle={setIsChatActive}
        />
      )
        : null}

      <div ref={rightRef} className={cx(styles.right, { [styles.active]: isChatActive })}>
        {isMobile && <div className={styles.separator} />}
        <Chat onChatToggle={setIsChatActive} active={isChatActive} />
      </div>

      <div className={styles.content}>
        {children}
        <div className={styles.footer}>
          { isShowMoreActive && <ShowMore /> }
          <Footer isMobile={isMobile} rates={rates} />
        </div>
      </div>
    </div>
  );
};

export { MainLayout };
