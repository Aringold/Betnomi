import React, { useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { MemoryRouter } from "react-router";

import '../packages/libs/assets/index.scss';

addDecorator((storyFn) => {
  const theme = select('Theme', {
    dark: 'dark',
    light: 'light',
  }, 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-background)',
    }}>
      {storyFn()}
    </div>
  )
});

addDecorator(withKnobs);
addDecorator(jsxDecorator);
addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);