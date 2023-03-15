import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';

import { CoinType } from '@betnomi/libs/types';
import { useUser } from 'hooks/useUser';
import { CurrencySymbol } from '@betnomi/libs/utils/currency';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import styles from './styles.module.scss';
import { FooterNav } from '../FooterNav';
import CoinsContainer from '../../layout/CoinsContainer';

import { useShallowSelector } from '../../../hooks';
import { selectAuthUI } from '../../../store/auth/selectors';
import { selectAssets } from '../../../store/home/selectors';
import { ImgIx } from '../../common/Imgix';

type Props = {
  rates?: Partial<Record<CoinType, number>>;
  isMobile: boolean;
};

export const Footer: React.FC<Props> = ({ rates = {}, isMobile = false }) => {
  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const { assetList } = useShallowSelector(selectAssets);
  const { bcCurrency } = useUser();
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });
  const smallScreen = windowInnerWidth > 768 && windowInnerWidth < 1200;

  const formattedPrice = (num: number): string => {
    const priceArr = String(num).split('.');
    priceArr[1] = priceArr[1].substr(0, 2);

    return priceArr.join('.');
  };

  const isMobileView = isMobile || (smallScreen && (isChatActive || isMenuActive));

  const logoImage = useMemo(() => <ImgIx className={styles.logo} src={assetList.find(({ name }) => name === 'Betnomi Logo')?.asset ?? 'default'} width={116} height={32} />, [assetList]);
  const licenseText = (
    <p className={styles.footer_text}>
      Betnomi.com is operated by Nomi N.V. (Registered address, Abraham de Veerstraat 9, Willemstad, Curacao). A company licensed and regulated by the laws of Curacao under the Master License number 365/JAZ.
    </p>
  );

  const GamingCuracao = useMemo(() => {
    const res = assetList.find(({ name }) => name === 'GamingCuracao')?.asset;
    if (res !== undefined) {
      return `https://${process.env.REACT_APP_IMGIX}/${res}&w=120`;
    }
    return '';
  }, [assetList]);

  const getImages = useCallback((id) => assetList.find((item) => item.id === id)?.asset ?? 'default', [assetList]);

  const images = useMemo(() => (
    <div className={styles.imagesContainer}>
      <ImgIx parentClass={styles.svgImg} src={getImages(56)} width={68} />
      <ImgIx parentClass={styles.svgImg} src={getImages(57)} width={34} />
      <div className={styles.sealContainer}>
        <div
          className={styles.seal}
          style={{ backgroundImage: `url("${GamingCuracao}")` }}
        />
        <iframe
          width={150}
          height={50}
          src="https://licensing.gaming-curacao.com/validator/?lh=21553d5c3ce834363384f6d90dca0bcf&template=tseal"
          style={{
            border: 'none', position: 'absolute', top: 0, opacity: 0,
          }}
          title="licensing.gaming-curacao"
        />
      </div>
    </div>
  ), [assetList]);

  const currencySymbol = bcCurrency && bcCurrency.length > 0 && bcCurrency !== 'UNKNOWN' ?
    CurrencySymbol[bcCurrency] : CurrencySymbol.USD; 

  return (
    <footer className={styles.footer}>
      <div className={styles.coins}>
        <CoinsContainer isMobile={isMobile} />
      </div>
      <FooterNav />
      {!isMobileView ? (
        <div className={styles.license}>
          {logoImage}
          {licenseText}
          {images}
        </div>
      ) : (
        <div className={styles.licenseMobile}>
          <div className={styles.logoImageWrapper}>        
            {logoImage}
            {images}
          </div>
          {licenseText}
        </div>
      )}

      <div className={smallScreen && (isChatActive || isMenuActive) ? styles.footer_small_bottom : styles.footer_bottom}>
        <div className={styles.btc_rates}>
          <CoinImg imgData="BTC" />
          {rates.BTC && (
          <p>
            1 BTC =
            {' '}
            {currencySymbol}
            {formattedPrice(rates.BTC)}
          </p>
          )}

        </div>
        <div>
          <a className={styles.social} target="blank" href="https://www.facebook.com/betnomi1/">
            <FontIcon name={FontIconName.Facebook} size={24} />
          </a>
          <a className={styles.social} target="blank" href="https://www.instagram.com/betnomi1">
            <FontIcon name={FontIconName.Instagram} size={24} />
          </a>
          <a className={styles.social} target="blank" href="https://twitter.com/betnomi1">
            <FontIcon name={FontIconName.Twitter} size={24} />
          </a>
          <a className={styles.social} target="blank" href="https://t.me/betnomi">
            <FontIcon name={FontIconName.Telegram} size={24} />
          </a>
        </div>
        <p className={styles.copyright}>© 2021 Betnomi</p>
      </div>
    </footer>
  );
};
