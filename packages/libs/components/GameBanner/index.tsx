import React, { FC } from 'react';
import cx from 'classnames';
import { ImgIx } from '@betnomi/client/src/components/common/Imgix';
import { Game } from '@betnomi/client/src/store/home/types';
import Skeleton from '@betnomi/libs/components/Skeleton';
import styles from './styles.module.scss';

interface Props {
  image: string
  className?: string
  width?: number
  height?: number
  imageClassname?: string
  imgixParams?: any
  game?: Game,
}

const GameBanner: FC<Props> = ({
  image,
  className,
  height,
  width,
  game,
  imageClassname,
  imgixParams,
}) => {
  const outer = (
    <div
      className={cx(styles.banner, className, {
        [styles.active]: game?.provider !== '',
      })}
    >
      <ImgIx
        className={imageClassname}
        src={image}
        width={width}
        height={height}
        imgixParams={imgixParams}
      />
    </div>
  );

  return game ? (
    outer
  ) : (
    <Skeleton height={height} width={width} />
  );
};

export default GameBanner;
