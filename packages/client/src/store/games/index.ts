import createReducer from '@betnomi/libs/utils/createReducer';
import { GamesState } from '../../types/store/games';
import { gamesHandlers } from './handlers';

const initialState: GamesState = {
  isLoading: false,
  list: [],
};

export default createReducer(initialState, gamesHandlers);
