/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import GameList, {
//   Breakpoints,
// } from '@betnomi/libs/components/homepage/GameList';
// import { GameType, RouteGameType } from '@betnomi/libs/types/ui/games';
import GameBanner from '@betnomi/libs/components/GameBanner';
import { Game } from '../../../../store/home/types';
// import { trendingData } from '../../../../constants/homePageGames';
//
// interface IProps {
//   isMobile: boolean;
//   games: Game[];
// }
//
// const trendingBreakpoints: Breakpoints = {
//   320: { slidesPerView: 2 },
//   375: { slidesPerView: 2 },
//   500: { slidesPerView: 3 },
//   660: { slidesPerView: 4 },
//   720: { slidesPerView: 4 },
//   1000: { slidesPerView: 4 },
//   1170: { slidesPerView: 5 },
//   1200: { slidesPerView: 5 },
//   1280: { slidesPerView: 5 },
//   1366: { slidesPerView: 6 },
//   1440: { slidesPerView: 6 },
//   1620: { slidesPerView: 6 },
//   2160: { slidesPerView: 'auto' },
// };

export const getGames = (gameList: Game[], gameType: string = '', imgSizes: { width: number, height: number }) => {
  let renderList = gameList;
  if (gameList.length === 0) {
    renderList = new Array(10).fill((null) as unknown as Game);
  }

  return renderList.map((game) => (
    <GameBanner
      image={game?.thumbnail || game?.asset || 'default'}
      key={game?.id}
      width={imgSizes.width}
      height={imgSizes.height}
      game={game}
    />
  ));
};

// const Trending: FC<IProps> = ({ isMobile, games }) => {
//   const trendingGames = games.filter((game) => trendingData.includes(game.game_id ? game.game_id : ''));
//
//   return (
//     <GameList
//       breakpoints={trendingBreakpoints}
//       games={getGames(
//         isMobile ? trendingGames.slice(0, 4) : trendingGames,
//         GameType.TrendingGames,
//         { width: 220, height: 305 },
//       )}
//       gameType={GameType.TrendingGames}
//       routType={RouteGameType.Casino}
//       spaceBetween={12}
//       slidesPerViewWithChatIsActive={5}
//     />
//   );
// };
//
// export default Trending;
