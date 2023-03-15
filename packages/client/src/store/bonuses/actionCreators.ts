import { Action } from 'redux';
// import { BackendErrorResponse } from 'types/api';
import { BonusesActionTypes } from './actionTypes';

export interface SetBonusesResponseData {
  data: any
}

export interface GetClaimBonusData {
  id: string
}

export interface GetCancelBonusData {
  activeBonusId: number
}

export interface GetBonusesAction extends Action {}

export interface SetBonusesResponseAction extends Action {
  data: SetBonusesResponseData
}

export interface GetClaimBonusAction extends Action {
  type: BonusesActionTypes.GetClaimBonus,
  data: GetClaimBonusData
}

export interface GetCancelBonusAction extends Action {
  type: BonusesActionTypes.GetCancelBonus,
  data: GetCancelBonusData
}

export const getBonuses = ():GetBonusesAction => ({
  type: BonusesActionTypes.GetBonuses,
});

export const setBonusesResponse = (data: SetBonusesResponseData): SetBonusesResponseAction => ({
  type: BonusesActionTypes.SetBonuses,
  data,
});

export const getClaimBonus = (data: GetClaimBonusData): GetClaimBonusAction => ({
  type: BonusesActionTypes.GetClaimBonus,
  data,
});

export const getCancelBonus = (data: GetCancelBonusData): GetCancelBonusAction => ({
  type: BonusesActionTypes.GetCancelBonus,
  data,
});
