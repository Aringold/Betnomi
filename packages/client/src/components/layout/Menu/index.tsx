import React, { useCallback } from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Link } from '@betnomi/libs/components';
import home from '@betnomi/libs/assets/img/icons/home.svg';
import gamesgames from '@betnomi/libs/assets/img/icons/gamesgames.svg';
import { useUserUI } from 'hooks/useUserUI';
import { menuItems } from './constants';
import { MenuElement } from '../MenuElement';
import { LanguageSwitch } from '../LanguageSwitch';
import { ThemeSwitch } from '../ThemeSwitch';
import { Routes } from '../../../constants/routes';
import { useTranslation } from '../../../i18n';
import { MobileButton as SupportMobile } from '../Support/Buttons/MobileButton';

import styles from './styles.module.scss';

type Props = {
  menuActive: boolean;
  onMenuToggle?: (val: boolean) => void;
  isMobile?: boolean;
};

export const Menu: React.FC<Props> = ({
  menuActive,
  onMenuToggle = () => {},
  isMobile = false,
}) => {
  const { t } = useTranslation();
  const { setIsChatActive } = useUserUI();
  const onMenuClick = useCallback(() => {
    if (isMobile) {
      setIsChatActive(false);
    }
    onMenuToggle(!menuActive);
  }, [menuActive, onMenuToggle]);

  const menuItemClick = () => {
    if (isMobile) {
      onMenuToggle(!menuActive);
    }
  };

  return (
    <nav className={cx(styles.nav, { [styles.active]: menuActive })}>
      {isMobile && (
        <FontIcon
          className={styles.closeIcon}
          onClick={onMenuClick}
          name={FontIconName.Close}
          size={16}
        />
      )}

      <div className={styles.menuContent}>
        {isMobile && (
          <div className={styles.links}>
            <Link to={Routes.Homepage}>
              <button onClick={onMenuClick} className={styles.link}>
                <img
                  className={styles.Imgicon}
                  src={home}
                  width={24}
                  height={24}
                  alt=""
                />
                <span>{t('Home')}</span>
              </button>
            </Link>
            <Link to={Routes.Casino}>
              <button onClick={onMenuClick} className={styles.link}>
                <FontIcon
                  name="icon-casino"
                  size={24}
                  className={cx(styles.icon)}
                />
                <span>{t('Casino')}</span>
              </button>
            </Link>
            <Link to={Routes.Games}>
              <button onClick={onMenuClick} className={styles.link}>
                <img
                  className={styles.Imgicon}
                  src={gamesgames}
                  width={24}
                  height={24}
                  alt=""
                />
                <span>{t('Games')}</span>
              </button>
            </Link>
            <Link to={Routes.LiveCasino}>
              <button onClick={onMenuClick} className={styles.link}>
                <FontIcon
                  name="icon-roulette"
                  size={24}
                  className={cx(styles.icon)}
                />
                <span>{t('Live Casino')}</span>
              </button>
            </Link>
          </div>
        )}

        <div className={styles.menu}>
          <ul className={styles.scrollable}>
            {menuItems(isMobile).filter(({ hide }) => !hide).map((el) => (
              <li key={el.options.label}>
                <MenuElement el={el} long={menuActive} isMobile={isMobile} onClick={menuItemClick} />
              </li>
            ))}
          </ul>
          <div className={styles.buttons}>
            {isMobile ? <SupportMobile /> : null}
            <div className={styles.lang_out}>
              <LanguageSwitch long={menuActive} />
            </div>
            <div className={styles.theme_out}>
              <ThemeSwitch long={menuActive} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
