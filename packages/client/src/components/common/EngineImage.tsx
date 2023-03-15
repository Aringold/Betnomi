import React, { FC } from 'react';
import { Image } from '@imageengine/react';

interface Props {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export const EngineImage: FC<Props> = ({
  className = '',
  src = '',
  alt = 'image',
  width,
  height,
  onClick,
}) => (
  <Image
    className={className}
    src={src}
    alt={alt}
    onClick={onClick}
    directives={{
      outputFormat: 'webp',
      inline: true,
      fitMethod: 'box',
      width,
      height,
      compression: 3,
    }}
  />
);
