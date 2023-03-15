/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import Ellips from '@betnomi/libs/assets/img/promotions/Ellipse1.png';
import Round2 from '@betnomi/libs/assets/img/promotions/Round1.png';
import BackgroundImage from '@betnomi/libs/assets/img/promotions/background1.png';
import Union from '@betnomi/libs/assets/img/promotions/Union.png';
import SummerDots from '@betnomi/libs/assets/img/promotions/background2.png';
import styles from './styles.module.scss';

interface IProps {
  type:boolean
  bgImage:string
  elipisis:string
  bgColor:string,
  title:string,
  para:string,
  round:string

}

const Promotions = ({
  type, bgImage, elipisis, bgColor, round, title, para, 
}: any) => (
  <div style={{ background: bgColor }} className={styles.promotionMain}>
    {
      !type && (
      <>
        <img className={styles.promoBackgroundImg} src={bgImage} alt="" />
        <img className={styles.ellips} src={elipisis} alt="" />
        <img className={styles.round} src={round} alt="" />
      </>
      )
    }
    <div className={styles.promotionHeadingBlock}>
      <h2 className={styles.headingPromotion}>{title}</h2>
      <p className={styles.promo}>Promo</p>
    </div>
    <p className={styles.promoPara}>{para}</p>
    {
      type && (
      <> 
        <img className={styles.elipisis} src={elipisis} alt="" />
        <img className={styles.mainPicDots} src={bgImage} alt="" />
      </>
      )
    }
  </div>
);

export { Promotions };
