import React from 'react';
import firstPNG from '@betnomi/libs/assets/img/promotions/first.png';
import secondPNG from '@betnomi/libs/assets/img/promotions/second.png';
import thirdPNG from '@betnomi/libs/assets/img/promotions/third.png';
import forthPNG from '@betnomi/libs/assets/img/promotions/forth.png';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { BonusType } from '.';

interface Props {
  type: BonusType;
}

const bonusPrecentFromType = (type: BonusType) => {
  switch (type) {
    case BonusType.first:
      return 150;
    case BonusType.second:
      return 100;
    default:
      return 50;
  }
};

const bonusPrecentColor = (type: BonusType) => {
  switch (type) {
    case BonusType.first:
      return styles.colorFirst;
    case BonusType.second:
      return styles.colorSecond;
    case BonusType.third:
      return styles.colorThird;
    default:
      return styles.colorForth;
  }
};

const robbin = (type: BonusType) => {
  switch (type) {
    case BonusType.first:
      return firstPNG;
    case BonusType.second:
      return secondPNG;
    case BonusType.third:
      return thirdPNG;
    default:
      return forthPNG;
  }
};

const bonusShadowColor = (type: BonusType) => {
  switch (type) {
    case BonusType.first:
      return styles.shdaowFirst;
    case BonusType.second:
      return styles.shdaowSecond;
    case BonusType.third:
      return styles.shdaowThird;
    default:
      return styles.shdaowForth;
  }
};

const bonusText = (type: BonusType) => {
  switch (type) {
    case BonusType.first:
      return '1st';
    case BonusType.second:
      return '2nd';
    case BonusType.third:
      return '3rd';
    default:
      return '4th';
  }
};

export const Bonus: React.FC<Props> = ({ type }) => (
  <div className={styles.bonus}>
    <img className={styles.ribbon} src={robbin(type)} alt="" />
    <span className={styles.textContainer}>
      <span className={classNames(styles.percent, bonusPrecentColor(type), bonusShadowColor(type))}>
        {`${bonusPrecentFromType(type)}% `}
      </span>
      <span>
        bonus
        <br />
        for your 
        {' '}
        {bonusText(type)}
        {' '}
        deposit
      </span>
    </span>
  </div>
);
