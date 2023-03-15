import { apiCMS } from '../../utils/api';
import { ApiCMSPaths } from '../../utils/api/constants';
import { GamesResponse } from './types';
import { CMSRequest } from '../../types/store/games';

export const getGames = (filter: CMSRequest) =>
  apiCMS.get<GamesResponse>(ApiCMSPaths.CMSGetGames, {
    params: {
      'filter[status]': filter.published,
      'filter[provider_title][_in]': filter.filterSearchProvider,
      'aggregate[count]': filter.aggregate,
      groupBy: filter.groupBy,
      [filter.filterKey]: filter.params,
      meta: filter.meta,
      limit: filter.limit,
      offset: filter.offset,
    },
  });
