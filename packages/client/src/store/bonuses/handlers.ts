import { BonusesState } from 'types/store/bonuses';
import { SetBonusesResponseData } from './actionCreators';
import { BonusesActionTypes } from './actionTypes';

const setBonusesResponse = (state: BonusesState, action: SetBonusesResponseData) => ({ ...state, bonuses: action.data.bonuses });
 
export const settingsHandlers = {
  [BonusesActionTypes.SetBonuses]: setBonusesResponse,
};
