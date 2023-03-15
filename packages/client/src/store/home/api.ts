import { apiCMS } from '../../utils/api';
import { ApiCMSPaths } from '../../utils/api/constants';
import { HomeGamesResponse } from './types';
import { CMSRequest } from '../../types/store/home';

export const getCMSGames = (filter: CMSRequest) =>
  apiCMS.get<HomeGamesResponse>(ApiCMSPaths.CMSGetGames, {
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

export const getHomeBanners = () => apiCMS.get(ApiCMSPaths.CMSGetBanners);

export const getCMSRecommendationsGames = (filter: CMSRequest) =>
  apiCMS.get(ApiCMSPaths.CMSGetRecommendationsGames, {
    params: {
      fields: 'games_id.*',
      [filter.filterKey]: filter.params,
    },
  });

export const getCMSAssets = () => apiCMS.get(ApiCMSPaths.CMSGetAssets);
