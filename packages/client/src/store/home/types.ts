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

export interface HomeGamesResponse {
  games: Game[],
  status: string,
  total_count: string,
}

export interface AssetsResponse {
  id: number,
  status: string,
  name: string,
  asset: string,
}

export interface SearchData {
  game_id: number;
  name: string;
  provider_title: string;
  thumbnail: string;
}

export interface Provider {
  provider_title: string;
  count: {
    id: number;
  };
}
