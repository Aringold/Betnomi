/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import { usePopperToggle } from '@betnomi/libs/hooks/usePopperToggle';
import { useShallowSelector } from '@betnomi/client/src/hooks';
import { selectPrivacy } from '@betnomi/client/src/store/settings/selectors';
import { PlayerLevel } from '../../../types/casino/levels';
import { UserImage } from '../../UserImage';
import { UserMenu } from '../UserMenu';
import { LevelBadge } from '../../LevelBadge';
import { PopperArrow } from '../../PopperArrow';
import styles from './styles.module.scss';
import imgConfirmed from '../../../assets/img/profile/confirmed.svg';
import imgUnconfirmed from '../../../assets/img/profile/unconfirmed.svg';

export interface UserWidgetProps {
  level: PlayerLevel;
  name: string;
  progress: number;
  image: string;
  confirmed: boolean;
  onLogout: () => void;
  isMobile: boolean;
}

const UserWidget: FC<UserWidgetProps> = ({
  level,
  name,
  progress,
  image,
  confirmed,
  onLogout,
  isMobile = false,
}) => {
  const confirmedIcon = confirmed ? imgConfirmed : imgUnconfirmed;
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const btnRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef(null);
  const { isUsernameHidden } = useShallowSelector(selectPrivacy);

  const { visible, handleDocumentClick, handleDropdownClick } = usePopperToggle(btnRef);

  const popperProps = usePopper(btnRef.current, popperRef.current, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'arrow',
        enabled: true,
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 20],
        },
      },
    ],
  });

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <button
        className={styles.widget}
        onClick={handleDropdownClick}
        ref={btnRef}
      >
        <UserImage image={image} progress={progress} level={level} size={44} />

        {!isMobile && (
          <div className={styles.info}>
            <div className={styles.name}>
              {!isUsernameHidden ? <span>{name}</span> : null}
              <img src={confirmedIcon} alt="" />
            </div>

            <LevelBadge level={level} />
          </div>
        )}
      </button>

      {visible && (
        <div
          className={classNames(styles.floating, {
            [styles.hidden]: !visible,
          })}
          ref={popperRef}
          onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
          style={popperProps.styles.popper}
          {...popperProps.attributes.popper}
        >

          <PopperArrow props={{ ref: setArrowElement, style: popperProps.styles.arrow }} />
          <UserMenu
            confirmed={confirmed}
            isMobile={isMobile}
            name={!isUsernameHidden ? name : undefined}
            level={level}
            progress={progress}
            onLogout={onLogout}
          />
        </div>
      )}
    </>
  );
};

export { UserWidget };
