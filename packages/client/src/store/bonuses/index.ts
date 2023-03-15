import createReducer from '@betnomi/libs/utils/createReducer';
import { BonusesState } from 'types/store/bonuses';
import { settingsHandlers } from './handlers';

export const bonusesInitialState: BonusesState = {
  bonuses: null,
};

export default createReducer(bonusesInitialState, settingsHandlers);
