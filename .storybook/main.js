const path = require('path');

module.exports = {
  stories: ['../packages/**/*/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    'storybook-addon-jsx',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          }
        },
      ],
    });

    config.module.rules.push({
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
