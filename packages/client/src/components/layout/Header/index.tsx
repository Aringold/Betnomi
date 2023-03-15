import React, {
  useCallback, useState, useEffect, useMemo, 
} from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Link } from '@betnomi/libs/components';
import { selectIsMobile } from 'store/global/selectors';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { HeaderGuest } from '../HeaderGuest';
import { HeaderUser, HeaderUserProps } from '../HeaderUser';
import { Routes } from '../../../constants/routes';
import { useShallowSelector } from '../../../hooks';
import { selectAssets } from '../../../store/home/selectors';
import { ImgIx } from '../../common/Imgix';

type Props = HeaderUserProps & {
  isAuthorized: boolean;
  onChatToggle: (val: boolean) => void;
  onNotificationToggle: (val: any) => void;
  onMenuToggle: (val: boolean) => void;
  chatActive: boolean;
  notificationActive: boolean;
  menuActive: boolean;
  onLogout: () => void;
  onOpenSignInModal: () => void;
  onOpenSignUpModal: () => void;
  isMobile: boolean;
};

export const Header: React.FC<Props> = ({
  isAuthorized,
  onChatToggle,
  onMenuToggle,
  chatActive,
  notificationActive,
  menuActive,
  onNotificationToggle,
  balances,
  rates,
  selectedCoin,
  onChangeCoin,
  name,
  level,
  progress,
  image,
  confirmed,
  onLogout,
  onOpenSignUpModal,
  onOpenSignInModal,
  onSettingsClick,
  onDepositClick,
  unreadMessagesCount,
}) => {
  const { t } = useTranslation();

  const { assetList } = useShallowSelector(selectAssets);
  const isMobile = useShallowSelector(selectIsMobile);

  const { asset: logo } = useMemo(() => assetList.find((item) => item.id === 55), [assetList]) || {};
  const { asset: mobilelogo } = useMemo(() => assetList.find((item) => item.id === 77), [assetList]) || {};
  const [isSmallDesktop, setSmallDesktop] = useState(window.innerWidth < 1300 && window.innerWidth > 768);
  const onMenuClick = useCallback(() => onMenuToggle(!menuActive), [
    menuActive,
    onMenuToggle,
  ]);

  const onMenuDesktopClick = useCallback(() => {
    if (chatActive) {
      onChatToggle(!chatActive);
    }
    onMenuToggle(!menuActive);

    //  onMenuToggle(!menuActive)
  }, [
    chatActive,
    menuActive,
    onChatToggle,
    onMenuToggle,
  ]);

  const updateMedia = () => {
    setSmallDesktop(window.innerWidth < 1300 && window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {!isMobile && (
        <div
          className={styles.menu_toggle}
          onClick={isSmallDesktop ? onMenuDesktopClick : onMenuClick}
          role="button"
          tabIndex={-1}
          onKeyPress={isSmallDesktop ? onMenuDesktopClick : onMenuClick}
        >
          <FontIcon name={FontIconName.Menu} size={24} />
        </div>
        )}
        <Link to={Routes.Homepage}>
          <ImgIx src={isMobile ? mobilelogo ?? 'default' : logo ?? 'default'} height={32} imgixParams={{ q: 10 }} />
        </Link>
      </div>

      {!isMobile && (
      <div className={styles.links}>
        <Link to={Routes.Casino}>{t('Casino') }</Link>
        <Link to={Routes.LiveCasino}>{t('Live Casino') }</Link>
        <Link to={Routes.Blast}>Blast</Link>
        <Link to={Routes.Poker}>Poker</Link>
        <Link to={Routes.Games}>{t('Games')}</Link>
      </div>
      )}

      {isAuthorized ? (
        <HeaderUser
          onChatToggle={onChatToggle}
          chatActive={chatActive}
          notificationActive={notificationActive}
          onNotificationToggle={onNotificationToggle}
          balances={balances}
          rates={rates}
          selectedCoin={selectedCoin}
          onChangeCoin={onChangeCoin}
          level={level}
          name={name}
          progress={progress}
          image={image}
          confirmed={confirmed}
          onLogout={onLogout}
          onDepositClick={onDepositClick}
          onSettingsClick={onSettingsClick}
          isMobile={isMobile}
          unreadMessagesCount={unreadMessagesCount}
        />
      ) : (
        <HeaderGuest
          onChatToggle={onChatToggle}
          active={chatActive} 
          onOpenSignInModal={onOpenSignInModal}
          onOpenSignUpModal={onOpenSignUpModal}
          isMobile={isMobile}
          isSmallDesktop={isSmallDesktop}
          onMenuToggle={onMenuToggle}
          menuActive={menuActive}
        />
      )}
    </header>
  );
};
