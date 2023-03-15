import { connectRouter } from 'connected-react-router';
import { history } from '@betnomi/libs/utils';
import auth from './auth';
import chat from './chat';
import modal from './modal';
import home from './home';
import rates from './rates';
import profile from './profile';
import global from './global';
import latestBets from './latestBets';
import settings from './settings';
import affiliate from './affiliate';
import bonuses from './bonuses';
import games from './games';

export default {
  router: connectRouter(history),
  auth,
  chat,
  modal,
  home,
  rates,
  profile,
  global,
  latestBets,
  settings,
  affiliate,
  bonuses,
  games,
};
