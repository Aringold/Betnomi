import React, { useEffect, useMemo } from 'react';
import { useShallowSelector } from 'hooks';
import { selectIsMobile } from 'store/global/selectors';
import classNames from 'classnames';
import { useUserUI } from 'hooks/useUserUI';
import { Routes } from 'constants/routes';
import { selectAssets } from 'store/home/selectors';
import { ImgIx } from 'components/common/Imgix';
import styles from './styles.module.scss';
import { Bonus } from './Bonus';

export enum BonusType {
  first = 1,
  second = 2,
  third = 3,
  forth = 4,
}

const forDepositText = (type: BonusType, isMobile = false) => {
  let nth;
  switch (type) {
    case BonusType.first:
      nth = '1st';
      break;
    case BonusType.second:
      nth = '2nd';
      break;
    case BonusType.third:
      nth = '3rd';
      break;
    default:
      nth = '4th';
      break;
  }
  return isMobile ? `${nth} deposit` : `For the ${nth} deposit`;
};

const BACKGROUND_IMAGE_ID = 68;
const BACKGROUND_IMAGE_MOBILE_ID = 69;

const Landing: React.FC = () => {
  const isMobile = useShallowSelector(selectIsMobile);
  const { isShowMoreActive, setIsShowMoreActive } = useUserUI();
  const { assetList } = useShallowSelector(selectAssets);
  const backgroundDesktop = useMemo(
    () => assetList.find((asset) => asset.id === BACKGROUND_IMAGE_ID),
    [assetList],
  );
  const backgroundMobile = useMemo(
    () => assetList.find((asset) => asset.id === BACKGROUND_IMAGE_MOBILE_ID),
    [assetList],
  );

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, [isShowMoreActive]);

  return (
    <div className={styles.topContainer}>
      <ImgIx
        className={styles.backgroundImage}
        src={
          (isMobile ? backgroundMobile : backgroundDesktop)?.asset ?? 'default'
        }
        sizes={isMobile ? '400px' : '1400px'}
      />
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Let The Game Begin</h1>
          <p className={styles.description}>
            <span>Get up to 150% exclusive welcome bonus</span>
            <span>for your 1st, 2nd, 3rd, and 4th deposits!</span>
          </p>
        </header>
        <div className={styles.bonusesContainer}>
          <span className={styles.bonusTitle}>
            Start your winning journey with Betnomi
          </span>
          <span className={styles.bonusDescription}>
            Take your chance to benefit from endless promotions including cash
            prizes,
            {!isMobile && <br />}
            free spins, boosts, reloads, and other bonuses.
          </span>
          <div className={styles.bonuses}>
            <Bonus type={BonusType.first} />
            <Bonus type={BonusType.second} />
            <Bonus type={BonusType.third} />
            <Bonus type={BonusType.forth} />
          </div>
        </div>
        <div className={styles.termsConditions}>
          <span className={styles.termsTitle}>Bonus terms and conditions</span>
          <ul className={styles.terms}>
            <li className={styles.termLine}>
              This offer is limited to one per person, household, IP, email,
              address, device.
            </li>
            <li className={styles.termLine}>
              The promotion is available only to the accounts with fully
              completed profiles.
            </li>
            <li className={styles.termLine}>
              To be eligible for deposit bonuses, you need to make a deposit of
              at least 5 USD or its crypto equivalent.
            </li>
            <li className={styles.termLine}>
              The maximum bet amount is 5 SBNI.
            </li>
            <li className={styles.termLine}>
              The maximum bonus payout is 300 SBNI for each deposit bonus.
            </li>
            <li className={styles.termLine}>
              The maximum total payout is 1200 SBNI.
            </li>
            <li className={styles.termLine}>
              The maximum deposit amount for each deposit bonus is 100 USD or
              its crypto equivalent.
            </li>
            <li className={styles.termLine}>
              After claiming the bonus, the initial eligible deposit amount and
              the bonus amount are converted into an SBNI (Stable Betnomi
              Token).
            </li>
            <li className={styles.termLine}>
              Please note that SBNI or sBNI is a stable token where 1 SBNI is
              equivalent to 1 USD.
            </li>
            <li className={styles.termLine}>The bonuses are</li>
            <div className={styles.depositContainer}>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.first, isMobile)}</span>
                <span className={styles.depositValue}>150%</span>
              </div>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.second, isMobile)}</span>
                <span className={styles.depositValue}>100%</span>
              </div>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.third, isMobile)}</span>
                <span className={styles.depositValue}>50%</span>
              </div>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.forth, isMobile)}</span>
                <span className={styles.depositValue}>50%</span>
              </div>
            </div>
            <li className={styles.termLine}>
              The maximum deposit bonus that can be claimed is:
            </li>
            <div className={styles.depositContainer}>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.first, isMobile)}</span>
                <span className={styles.depositValue}>150 SBNI</span>
              </div>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.second, isMobile)}</span>
                <span className={styles.depositValue}>100 SBNI</span>
              </div>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.third, isMobile)}</span>
                <span className={styles.depositValue}>50 SBNI</span>
              </div>
              <div className={styles.deposit}>
                <span>{forDepositText(BonusType.forth, isMobile)}</span>
                <span className={styles.depositValue}>50 SBNI</span>
              </div>
            </div>
            <li className={styles.termLine}>
              For each deposit maximum cap applies based on the percentages
              mentioned above.
            </li>
            <li className={styles.termLine}>
              All deposit bonuses must be redeemed by wagering the bonus amount
              up to 40 times depending on the which deposit customer is
              <br />
              making within 7 days after receiving the bonus amount.
            </li>
            <li className={styles.termLine}>
              Bonus wagering should be done via Bonus Contribution Table.
            </li>
            <div className={styles.depositContainer}>
              <div className={styles.deposit}>
                <span>Slot Games</span>
                <span className={styles.depositValue}>150%</span>
              </div>
              <div className={styles.deposit}>
                <span>Blast</span>
                <span className={styles.depositValue}>70%</span>
              </div>
              <div className={styles.deposit}>
                <span>
                  Games&nbsp;
                  <span className={styles.mobileSmall}>(Blast excluded)</span>
                </span>
                <span className={styles.depositValue}>50%</span>
              </div>
              <div className={styles.deposit}>
                <span>Live games</span>
                <span className={styles.depositValue}>25%</span>
              </div>
            </div>
            <span className={styles.tableTitle}>
              The Promotion has the following Bonus table
            </span>
            <div className={styles.table}>
              <div className={styles.column}>
                <span className={styles.tableHeader}>Deposit</span>
                <span className={styles.row}>1</span>
                <span className={styles.row}>2</span>
                <span className={styles.row}>3</span>
                <span className={styles.row}>4</span>
              </div>
              <div className={styles.column}>
                <span className={styles.tableHeader}>Bonus Percentage</span>
                <span className={styles.row}>150%</span>
                <span className={styles.row}>100%</span>
                <span className={styles.row}>50%</span>
                <span className={styles.row}>50%</span>
              </div>
              <div className={styles.column}>
                <span className={styles.tableHeader}>Bonus amout max Cap</span>
                <span className={styles.row}>150 SBNI</span>
                <span className={styles.row}>100 SBNI</span>
                <span className={styles.row}>50 SBNI</span>
                <span className={styles.row}>50 SBNI</span>
                <div />
              </div>
              <div className={styles.column}>
                <span className={styles.tableHeader}>
                  Bonus Wagerin Reqirement
                </span>
                <span className={styles.row}>40x</span>
                <span className={styles.row}>35x</span>
                <span className={styles.row}>25x</span>
                <span className={styles.row}>20x</span>
              </div>
            </div>
            <li className={styles.termLine}>
              You need to press on Claim Bonus button to receive the bonus.
            </li>
            <li className={styles.termLine}>
              Any losing bet deducts from the initial deposit first.
            </li>
            <li className={styles.termLine}>
              Both the bonus and any winnings will be forfeited if the bonus
              expires or when the bonus is canceled.
            </li>
            <li className={styles.termLine}>
              Only bets placed during the bonus validity period will be taken
              into consideration.
            </li>
            <div className={classNames(styles.examples, styles.termLine)}>
              Examples: The maximum payout from the bonus is limited to 300
              SBNI. Winnings that exceed this amount will be removed
              <br />
              from the account.
              <br />
              For instance, if the bonus payout was 500 SBNI, of which 50 SBNI
              was the initial deposit, the payable amount will be 300 SBNI
              <br />
              (50 SBNI deposit amount + 250 SBNI) and the remaining 200 SBNI
              will be deducted from the account.
              <br />
              If you make the first deposit of 100 USD, you will receive a 150
              SBNI bonus after pressing the Claim Bonus button. The bonus
              <br />
              amount needs to be wagered 40 times.
              <br />
              If you make the first deposit of 3 USD, you will no longer be
              eligible for the first deposit bonus, however, you can still have
              the
              <br />
              second, third and fourth deposit bonus.
            </div>
            <li className={styles.termLine}>
              Each player participating in the mentioned promotion authorizes
              and accepts the publication of his username for any purpose
              <br />
              related to the promotion.
            </li>
            <li className={styles.termLine}>
              Payouts on bets settled after the bonus has expired will not be
              counted in the wagering requirement.
            </li>
            <li className={styles.termLine}>
              Each player participating in the promotion recognizes to have read
              and accept this regulation.
            </li>
            <li className={styles.termLine}>
              Betnomi reserves the right acting reasonably to withhold, restrict
              or cancel this offer from individual account holders in breach of
              <br />
              these terms and conditions or in breach of our general terms and
              conditions.
            </li>
            <li className={styles.termLine}>
              Betnomi reserves the right to change or end any promotion if
              required for legal and/or regulatory reasons.
            </li>
            <li className={styles.termLine}>
              Betnomi&apos;s General&nbsp;
              <a className={styles.termsLink} href={Routes.Terms}>
                Terms and Conditions
              </a>
              &nbsp;apply to this promotion.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
