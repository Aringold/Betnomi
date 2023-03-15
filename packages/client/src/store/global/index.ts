import createReducer from '@betnomi/libs/utils/createReducer';
import { globalHandlers } from './handlers';
import { GlobalData } from './types';

export const globalInitialState: GlobalData = {
  isMobile: false,
  isSmallScreen: false,
  newAvatar: '',
};

export default createReducer(globalInitialState, globalHandlers);
