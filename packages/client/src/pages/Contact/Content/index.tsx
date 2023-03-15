import React, { FC } from 'react';

import styles from './styles.module.scss';

import headphone from '../../../../../libs/assets/img/headphone.svg';
import email from '../../../../../libs/assets/img/email.svg';
import phone from '../../../../../libs/assets/img/phone.svg';
import telegram from '../../../../../libs/assets/img/telegram.svg';

const Content: FC = () => (
  <div className={styles.content}>
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={headphone} alt="headphone" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          Live Support
        </div>
        <div className={styles.text}>
          <p>
            24/7 Customers Support its here to answer your question. Start chatting now or give us an online call.
          </p>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={phone} alt="headphone" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          Phone
        </div>
        <div className={styles.text}>
          <p>
            You can contact us on our hotline.
          </p>
          <a href="tel:+1(336)6520397" className={styles.link}>
            +1(336) 6520397
          </a>
          <a href="tel:+44 20 7770 9936" className={styles.link}>
            +44 20 7770 9936
          </a>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={email} alt="headphone" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          Email
        </div>
        <div className={styles.text}>
          <p>
            For all customer queries, please email us at 
            {' '}
            <a href="mailto: support@betnomi.com" target="_blank" className={`${styles.link} ${styles.linkInline}`} rel="noreferrer">support@betnomi.com</a>
            {' '}
            and quote your username and Player ID. For all other questions or offers, please email us at
            {' '}
            <a href="mailto: info@betnomi.com" target="_blank" className={`${styles.link} ${styles.linkInline}`} rel="noreferrer">info@betnomi.com </a>
          </p>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={telegram} alt="headphone" />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          Telegram Support
        </div>
        <div className={styles.text}>
          <p>
            Write to us in the chat, we are always happy to help!
          </p>
          <a href="https://t.me/betnomi" target="_blank" className={styles.link} rel="noreferrer">
            t.me/betnomi
          </a>
        </div>
      </div>
    </div>
  </div>
);

export { Content };
