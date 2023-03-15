import React, { FC } from 'react';
import football from '@betnomi/libs/assets/img/sports/football.svg';
import basketball from '@betnomi/libs/assets/img/sports/basketball.svg';
import tennis from '@betnomi/libs/assets/img/sports/tennis.svg';
import volleyball from '@betnomi/libs/assets/img/sports/volleyball.svg';
import dota from '@betnomi/libs/assets/img/sports/dota.svg';
import baseball from '@betnomi/libs/assets/img/sports/baseball.svg';
import mma from '@betnomi/libs/assets/img/sports/mma.svg';
import hokey from '@betnomi/libs/assets/img/sports/hokey.svg';
import handball from '@betnomi/libs/assets/img/sports/handball.svg';
import cricket from '@betnomi/libs/assets/img/sports/cricket.svg';
import chess from '@betnomi/libs/assets/img/sports/chess.svg';
import darts from '@betnomi/libs/assets/img/sports/darts.svg';
import snooker from '@betnomi/libs/assets/img/sports/snooker.svg';
import golf from '@betnomi/libs/assets/img/sports/golf.svg';
import cycling from '@betnomi/libs/assets/img/sports/cycling.svg';
import netball from '@betnomi/libs/assets/img/sports/netball.svg';
import csgo from '@betnomi/libs/assets/img/sports/csgo.svg';
import featured from '@betnomi/libs/assets/img/sports/featured.svg';
import futsal from '@betnomi/libs/assets/img/sports/futsal.svg';
import nfl from '@betnomi/libs/assets/img/sports/nfl.svg';
import surfing from '@betnomi/libs/assets/img/sports/surfing.svg';

import { GameCategory } from '../../../constants/gameCategory';
import styles from '../GameCategoriesList/styles.module.scss';

interface Props {
  category: GameCategory;
}

const gameCategoryIcons: Record<GameCategory, string> = {
  [GameCategory.Featured]: featured,
  [GameCategory.Football]: football,
  [GameCategory.Tennis]: tennis,
  [GameCategory.Volleyball]: volleyball,
  [GameCategory.NFL]: nfl,
  [GameCategory.Baseball]: baseball,
  [GameCategory.MMA]: mma,
  [GameCategory.Hokey]: hokey,
  [GameCategory.Cricket]: cricket,
  [GameCategory.CSGO]: csgo,
  [GameCategory.Dota]: dota,
  [GameCategory.Handball]: handball,
  [GameCategory.Darts]: darts,
  [GameCategory.Golf]: golf,
  [GameCategory.Snooker]: snooker,
  [GameCategory.Cycling]: cycling,
  [GameCategory.Netball]: netball,
  [GameCategory.Basketball]: basketball,
  [GameCategory.Futsal]: futsal,
  [GameCategory.Surfing]: surfing,
  [GameCategory.Chess]: chess,
};

const GameCategoryIcon: FC<Props> = ({ category }) => (
  <img src={gameCategoryIcons[category]} alt={category} className={styles.gameCategory} />
);

export default GameCategoryIcon;
