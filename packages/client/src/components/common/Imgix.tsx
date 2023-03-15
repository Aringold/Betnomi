/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import Imgix, { SharedImigixAndSourceProps } from 'react-imgix';

interface Props extends SharedImigixAndSourceProps {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  parentClass?: string;
  onClick?: () => void;
}

export const ImgIx: FC<Props> = ({
  className = '',
  src = '',
  width,
  height,
  parentClass,
  onClick,
  ...rest
}) => (
  <div className={parentClass} onClick={onClick} role="button" tabIndex={0}>
    {
      src !== 'default' || src !== undefined ? (
        <Imgix
          src={src}
          className={className}
          width={width}
          height={height}
          {...rest}
        />
      ) : null
    }
  </div>
);
