import createReducer from '@betnomi/libs/utils/createReducer';
import { LatestBetsState } from '../../types/store/latestBets';
import { latestBetsHandlers } from './handlers';

export const lattestBetsInitialState: LatestBetsState = {
  data: [],
};

export default createReducer(lattestBetsInitialState, latestBetsHandlers);
