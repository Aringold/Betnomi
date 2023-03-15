export enum GameType {
  TrendingGames = 'TrendingGames',
  Slots = 'Slots',
  LiveCasino = 'LiveCasino',
  GameProviders = 'GameProviders',
  Promotions = 'Promotions',
  RecommendedGames = 'RecommendedGames',
}

export enum RouteGameType {
  Casino = 'casino',
  LiveCasino = 'live-casino',
  Game = 'game',
}

export const gameNames: Record<GameType, string> = {
  [GameType.TrendingGames]: 'Trending',
  [GameType.Slots]: 'Slots',
  [GameType.LiveCasino]: 'Live Casino',
  [GameType.GameProviders]: 'Game Providers',
  [GameType.Promotions]: 'Promotions',
  [GameType.RecommendedGames]: 'Recommended Games',
};
