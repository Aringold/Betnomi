import { State } from 'types/store';

export const selectBonuses = (state: State) => state.bonuses.bonuses;
