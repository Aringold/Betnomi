export interface Game {
  background: string
  blocked_currencies: string[]
  categories: string[]
  description: string
  front_game_id: string
  provider?: string,
  icon_2: string
  icon_3?: string
  id: string
  provider_title?: string
  name: string
  asset?: string
  thumbnail?: string;
  game_id?: string
}

export interface GamesResponse {
  data: Game[]
}
