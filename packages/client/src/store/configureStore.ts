import {
  applyMiddleware, combineReducers, compose, createStore, 
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { isExpired } from 'react-jwt';
import { centrifugeMiddleware } from '@betnomi/libs/store/middleware/centrifuge';
import assocPath from 'ramda/es/assocPath';
import { hasPath, values } from 'ramda';
import reducer from './rootReducer';
import rootSaga from './rootSaga';
import { api } from '../utils/api';
import { PersistKeys } from '../constants/persist';
import { CentrifugeSuffixes } from '../constants/centrifuge';
import { ChatRoom } from './chat/constants';
import { ApiPaths } from '../utils/api/constants';
import { AuthState } from '../types/store/auth';
import { RatesState } from '../types/store/rates';

const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: PersistKeys.Auth,
  storage,
  whitelist: ['access', 'refresh', 'game', 'ranks', 'currency'] as Array<
  keyof AuthState
  >,
};

const ratesPersistConfig = {
  key: PersistKeys.Rates,
  storage,
  whitelist: ['rates', 'lastLoadedAt'] as Array<keyof RatesState>,
};

const settingsPersistConfig = {
  key: PersistKeys.Settings,
  storage,
  whitelist: ['viewInFiatCurrency', 'cryptoCurrencies', 'privacy'],
};

const assetsPersistConfig = {
  key: PersistKeys.Home,
  storage,
  whitelist: ['assets', 'games', 'banners'],
};

const reducers = {
  ...reducer,
  auth: persistReducer(authPersistConfig, reducer.auth),
  rates: persistReducer(ratesPersistConfig, reducer.rates),
  settings: persistReducer(settingsPersistConfig, reducer.settings),
  home: persistReducer(assetsPersistConfig, reducer.home),
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export default (initialState: { [key: string]: never } = {}) => {
  if (!process.env.REACT_APP_WEBSOCKET_URL) {
    throw new Error('No REACT_APP_WEBSOCKET_URL defined. Specify it at .env');
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        centrifugeMiddleware(
          process.env.REACT_APP_WEBSOCKET_URL,
          values(ChatRoom),
          CentrifugeSuffixes.Chat,
        ),
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  // Pass token to axios
  api.interceptors.request.use((options) => {
    const token = store.getState().auth.access;
    if (
      isExpired(token) ||
      options.url === ApiPaths.AuthRefresh ||
      hasPath(['headers', 'authorization'], options)
    ) {
      return options;
    }

    return assocPath(['headers', 'authorization'], `Bearer ${token}`, options);
  });

  return { store, persistor };
};
