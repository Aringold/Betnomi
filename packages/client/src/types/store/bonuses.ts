export interface ActiveBonusData {
  amountInUsd: number,
  bonusInUsd: number,
  endsAt: string,
  id: string,
  name: string,
  status: string,
  startsAt: string,
  targetInUsd: number,
  totalBetInUsd: number,
  wagerRequirement: number
}
export interface BonusesStateData {
  id: string,
  name: string,
  eligible: boolean,
  activeBonus?: ActiveBonusData
}
export interface BonusesState {
  bonuses: BonusesStateData[] | null
}
