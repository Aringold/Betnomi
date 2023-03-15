import { ModalState } from './modal';
import { AuthState } from './auth';
import { ChatState } from './chat';
import { HomeState } from './home';
import { RatesState } from './rates';
import { ProfileState } from './profile';
import { GlobalState } from './global';
import { LatestBetsState } from './latestBets';
import { SettingsState } from './settings';
import { AffiliateState } from './affiliate';
import { BonusesState } from './bonuses';
import { GamesState } from './games';

export interface State {
  auth: AuthState
  chat: ChatState
  home: HomeState
  modal: ModalState
  rates: RatesState
  profile: ProfileState
  global: GlobalState
  latestBets: LatestBetsState
  settings: SettingsState
  affiliate: AffiliateState
  bonuses: BonusesState
  games: GamesState
}
