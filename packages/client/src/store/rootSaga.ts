import { fork } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import chatSaga from './chat/sagas';
import { ratesSaga } from './rates/sagas';
import profileSaga from './profile/sagas';
import latestBets from './latestBets/saga';
import settingsSaga from './settings/sagas';
import affiliateSaga from './affiliate/sagas';
import HomeSaga from './home/sagas';
import bonusesSaga from './bonuses/sagas';
import gamesSaga from './games/sagas';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(chatSaga);
  yield fork(ratesSaga);
  yield fork(profileSaga);
  yield fork(latestBets);
  yield fork(settingsSaga);
  yield fork(affiliateSaga);
  yield fork(HomeSaga);
  yield fork(bonusesSaga);
  yield fork(gamesSaga);
}
