import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'i18n';
import configureStore from 'store/configureStore';
import '@betnomi/libs/assets/index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from '@betnomi/libs/utils';
import { App } from 'containers/app/App';

const { ImgixProvider } = require('react-imgix');

const config = configureStore();
export const { store, persistor } = config;
const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <ImgixProvider domain={process.env.REACT_APP_IMGIX || ''}>
          <App />
        </ImgixProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  root,
);
