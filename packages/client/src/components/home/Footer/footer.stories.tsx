import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Footer } from './index';

storiesOf('Home', module).add('Footer', () => {
  const isMobile = boolean('isMobile', false);

  return (
    <Footer isMobile={isMobile} />
  );
});
