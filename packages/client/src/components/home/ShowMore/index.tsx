import React, { useState } from 'react';
import cx from 'classnames';
import Gradient from 'components/common/Gradient';
import styles from './styles.module.scss';

export const ShowMore: React.FC = () => {
  const [isExpanded, setExpanded] = useState(false);
  const handleShowMore = () => {
    setExpanded(!isExpanded);
  };
  return (
    <div className={styles.container}>
      <p className={styles.label}>
        Leading Bitcoin Casino & Crypto Sportsbook
      </p>
      <div className={styles.desc}>
        <p>
          Betnomi gaming platform powered by blockchain and decentralized
          technology is at the forefront of cryptocurrency gambling. We offer an
          amazing collection of over eight thousand high-quality and certified
          RNG games from the industry’s top providers and sports betting events
          spanning over 50 categories and 120k pre and live matches monthly.
        </p>
        <p>
          Founded in 2018, regulated and licensed by the government of
          Curaçao, our cryptocurrency-based casino provides smooth
          registration, seamless service, and lightning-fast withdrawals
          secured by the blockchain and smart contracts that are anonymous,
          safe, and secure.
        </p>
        <Gradient state={isExpanded} />
        <div className={cx(styles.hidden, { [styles.active]: isExpanded })}>
          <p>
            All this makes Betnomi a perfect place to have fun, play with
            confidence, and enjoy a unique user experience provided by
            Betnomi&apos;s next-generation gaming engine.
          </p>
          <p>
            At our casino, we support all of the popular cryptocurrencies for a
            deposit, wager, and withdrawal of your winnings. Supported coins:
            Bitcoin, Ethereum, Litecoin, Binance Smart Chain, Tron, and many
            more.
          </p>
          <p>
            To make your gaming experience even more exciting, Betnomi offers
            endless promotions to reward you with pleasant cash prizes,
            cashbacks, rakebacks, free spins, boosts, reloads, and other
            bonuses.
          </p>
          <p className={styles.promotion}>
            Ready to get started? Create your account in minutes, collect your
            welcome bonus, and let the game begin!
          </p>
        </div>
      </div>
      <button onClick={handleShowMore} className={styles.link}>
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};
