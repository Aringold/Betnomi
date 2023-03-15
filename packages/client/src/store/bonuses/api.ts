import { api } from 'utils/api';
import { ApiPaths } from 'utils/api/constants';
import { GetClaimBonusData, GetCancelBonusData } from './actionCreators';

export const getBonuses = () =>
  api.get(ApiPaths.BONUSES);

export const getClaimBonus = (data: GetClaimBonusData) =>
  api.post(ApiPaths.CLAIMBONUS, data);

export const getCancelBonus = (data: GetCancelBonusData) =>
  api.post(ApiPaths.CANCELBONUS, data);
