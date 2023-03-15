import React, {
  FC, useMemo,
} from 'react';
import defaultAvatar from '@betnomi/libs/assets/img/profile/avatar.png';
import { PlayerLevel } from '../../types/casino/levels';
import styles from './styles.module.scss';
import { LevelColors } from '../../constants/levels';
import { describeArc } from '../../utils/svg/arc';

export interface UserImageProps {
  image: string;
  progress: number;
  level: PlayerLevel;
  size?: number;
}

const UserImage: FC<UserImageProps> = ({
  image, progress, level, size = 44,
}) => {
  const perc = Math.min(Math.max(2, progress || 0), 100);
  const arc = useMemo(() => describeArc(22, 22, 21, 0, 359 * (perc / 100)), [perc]);
  let userImage = defaultAvatar;
  if (!!image && process.env.REACT_APP_CDN_URL) {
    userImage = process.env.REACT_APP_CDN_URL + image;
  }

  return (
    <div className={styles.container}>
      <svg className={styles.user} width={size} height={size} viewBox="0 0 44 44">
        <circle cx={22} cy={22} r={16.5} fill="var(--color-button)" />
        <circle cx={22} cy={22} r={21} fill="none" stroke={LevelColors[level]} strokeWidth={2} opacity={0.5} />
        <path d={arc} stroke={LevelColors[level]} strokeWidth={2} opacity={1} fill="none" />
      </svg>
      <img
        className={styles.image}
        src={userImage}
        width={34}
        height={34}
        alt="avatar"
      />
    </div>
  );
};

export { UserImage };
