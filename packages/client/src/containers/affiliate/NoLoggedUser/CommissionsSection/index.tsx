import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SignUpIcon } from '@betnomi/libs/assets/img/affiliate/Group.svg';
import { ReactComponent as PromoteIcon } from '@betnomi/libs/assets/img/affiliate/Group-1.svg';
import { ReactComponent as EarnIcon } from '@betnomi/libs/assets/img/affiliate/Group-2.svg';
import styles from './styles.module.scss';

import greenTwiIcon from '../../../../../../libs/assets/img/greenTwoIcon.svg';
import whiteTwoIcon from '../../../../../../libs/assets/img/whiteTwoIcon.svg';
import fourWhiteIcon from '../../../../../../libs/assets/img/fourWhiteIcons.svg';
import blackWhiteIcon from '../../../../../../libs/assets/img/blackWhiteIcons.svg';
import reverseWhiteIcon from '../../../../../../libs/assets/img/revereTwoWhiteIcon.svg';
import whiteIcon from '../../../../../../libs/assets/img/whiteIcon.svg';
import whiteGreenIcon from '../../../../../../libs/assets/img/whiteGreenIcon.svg';
import threeWhiteIcon from '../../../../../../libs/assets/img/threeWhiteIcon.svg';

const CommissionsSection: FC = () => {
  const { t } = useTranslation('affiliate');

  return (
    <section className={styles.commissions}>
      <div className={styles.content}>
        <ul className={styles.infoList}>
          <li>
            <SignUpIcon />
            <h3>{t('Sign up')}</h3>
            <p>{t('Make an informed and smart choice.')}</p>
          </li>
          <li>
            <PromoteIcon />
            <h3>{t('Promote')}</h3>
            <p>{t('We offer you various marketing tools  to promote your business.')}</p>
          </li>
          <li>
            <EarnIcon />
            <h3>{t('Earn')}</h3>
            <p>{t('The more traffic you bring us, the  more you earn')}</p>
          </li>
        </ul>

        <h2 className={styles.title}>{t('Commissions')}</h2>

        <ul className={styles.commissionsCards}>
          <li className={styles.revenue}>
            <h3 className={styles.itemTitle}>{t('Wager System')}</h3>
            <p className={styles.itemText}>
              {t('An innovative affiliate reward structure that ensures our affiliates consistently earn.\n' +
                'With the wager mode, you receive a percentage of the value of bets placed by your referrals.\n' +
                'You will always get paid once your referral places a bet, regardless of the outcome of the bet.\n' +
                'Win or Lose.')}
            </p>
            <img src={whiteTwoIcon} alt="Revenue" className={styles.whiteIcons} />
            <img src={greenTwiIcon} alt="Revenue" className={styles.greenIcons} />
          </li>
          <li className={styles.revenueSecond}>
            <h3 className={styles.itemTitle}>{t('Revenue Share')}</h3>
            <p className={styles.itemText}>
              {t('We have a NO NEGATIVE CARRY-OVER policy. That means that in the rare cases you have an unlucky month and your referred' +
                                ' players take your affiliate account into the negative, you\'ll start fresh the following month, the negative balance doesn\'t carry-forward. ')}
            </p>
            <img src={fourWhiteIcon} alt="Revenue" className={styles.fourWhiteIcon} />
            <img src={threeWhiteIcon} alt="Revenue" className={styles.threeWhiteIcon} />
          </li>
          <li className={styles.hybrid}>
            <h3 className={styles.itemTitle}>{t('Hybrid')}</h3>
            <p className={styles.itemText}>
              {t('The hybrid deal we offer is fully flexible combination of the Cost Per Acquisition and the Revenue Share deal.' +
                                ' It enables affiliates to get an upfront payment without giving up the long term profits. ' +
                                'For the Affiliates interested in Hybrid model contact to the affiliate manager.')}
            </p>
            <img src={blackWhiteIcon} alt="Hybrid" className={styles.blackWhiteIcon} />
            <img src={reverseWhiteIcon} alt="Hybrid" className={styles.reverseWhiteIcon} />
          </li>
          <li className={styles.affiliates}>
            <h3 className={styles.itemTitle}>{t('Sub Affiliates')}</h3>
            <p className={styles.itemText}>
              {t('Every time you introduce an affiliate to Betnomi, we reward you with a default 5% commission based on your sub ' +
                                'network\'s performance. Invite your friends - it\'s a win-win for all!')}
            </p>
            <img src={whiteGreenIcon} alt="Sub Affiliates" className={styles.whiteGreenIcon} />
            <img src={whiteIcon} alt="Sub Affiliates" className={styles.whiteIcon} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export { CommissionsSection };
