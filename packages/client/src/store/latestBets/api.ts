import { api } from '../../utils/api';
import { ApiPaths } from '../../utils/api/constants';
import { LatestBetsResponse } from './types';

export const fetchLattestBets = () => api.get<LatestBetsResponse>(ApiPaths.LatestBets);
