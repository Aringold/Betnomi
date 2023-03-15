import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import styles from './styles.module.scss';

const faqs = [
  { id: 11124223, question: 'How does it work? ', answer: 'Register for our affiliate program, and we\'ll provide you with an affiliate ID and access to all our marketing tools to help you promote some of the hottest and best converting gaming products in the industry. Then you can place our banners and links on your website. The more clicks you have on our links, the more players and, eventually, more money you will earn.' },
  { id: 3453456, question: 'What does a \'valid referral\' mean?', answer: 'To become a \'valid referral\', a customer you send to us via your affiliate link should be over 18 years old and should comply with our player terms and conditions in the region they are playing in. You must also operate under our affiliate terms and conditions while promoting the Betnomi website.' },
  { id: 2123213, question: 'Who can become an affiliate?', answer: 'Anyone can become an affiliate! All you need to do is create an on the Betnomi website and navigate to the affiliate page. As soon as your account is activated, you will get full access to all our affiliate and promotional tools.' },
  { id: 414634523, question: 'Do I need to have a website to join?', answer: 'You do not need a website to become an affiliate of Betnomi. Your referral links can be directly shared with your friends and family. However, you must comply with the terms and conditions of Betnomi\'s affiliate program.' },
  { id: 411234523, question: 'Will you accept my website?', answer: 'We accept the majority of websites; however, your site(s) will be reviewed to ensure that the content is considered acceptable and not damaging for our brand. Betnomi Affiliates Team reserves the right to refuse membership to a site or revoke a site\'s membership at any time if we deem that it contains objectionable content or images (e.g. of a pornographic, religious, political, or racially prejudicial nature).' },
  { id: 41423523, question: 'How does a customer become associated with my affiliate account?', answer: 'Each link that connects your site to Betnomi contains a unique tracking ID. It helps to track impressions, clicks, registrations, deposits/withdrawals, and player activity of your referred customers on our site. That information is stored in our database and is accessible to you in the reports we provide via your affiliate dashboard. Impressions and clicks form the part of live reporting and all other player activities are available to view in real time.' },
  { id: 11124224, question: 'Can I use Betnomi\'s content on my site?', answer: 'Feel free to put as many Betnomi affiliate links on your site as you like.' },
  {
    id: 12124223,
    question: 'How and when I will get paid?',
    answer: 'We pay affiliate commissions for affiliates on wager-based plans in real time, and there are minimum payouts and withdrawal limits. You can withdraw your commissions instantly, just when you get paid.\n' +
      'For revenue share and other plans, we pay by the 15th of the following month for all orders completed before the 5th day of that month. The minimum withdrawal amount is $100.00. If your balance is less than the minimum amount, it will be carried forward to the next month.',
  },
  {
    id: 11324223,
    question: 'What is your Commission structure?',
    answer: 'The commission structure for wager based plans is: ((100 - RTP) / 100 * wagered / 2) * commission rate.\n' +
      'Note bonuses and other related costs will be factored into the final payout. For a more detailed breakdown, check your affiliate dashboard.\n' +
      'If you have an established website with a large visitors base and think that it could be better served with an alternative tailor-made commission structure, please contact our team, and we\'ll be happy to discuss it with you.',
  },
  { id: 11534223, question: 'How often are my stats updated?', answer: 'All stats are updated in real time.' },
  { id: 11525223, question: 'How the Net Revenue is calculated?', answer: 'Net Revenue in the Betnomi is calculated by taking Gross Profit Figure and deducting Governmental Taxes, Deposit and Withdrawal Expenses, Casino Cashback Bonuses and Converted Bonus amount as a cost.' },
  { id: 11527223, question: 'Can I get an exclusive offer or promotion to use on my website?', answer: 'Sure. Pitch us your idea. We\'re always happy to discuss any exclusive promotions that can be beneficial to our mutual success. Please get in touch with our team.' },
  { id: 11529223, question: 'Whom should I contact if I need help?', answer: 'Please email to Betnomi and one of our affiliate managers will get back to you within 2 working days.' },
  { id: 11522223, question: 'How do I get my tracking Refferal link and banners?', answer: 'Affiliate links and banners are available to all partners and can be accessed via your affiliate dashboard.' },
];

const FAQItem = ({
  faq, setActive, active,
}: any) => {
  const handleOpen = () => {
    if (active) {
      setActive(null);
    } else {
      setActive(faq.id);
    }
  };
  return (
    <div className={cx(styles.faqItem)}>
      <div role="presentation" className={styles.faqTitle} onClick={handleOpen}>
        {faq.question}
        <span className={styles.icon}>{active ? '-' : '+'}</span>
      </div>
      <div className={cx(styles.faqBody, { [styles.active]: active })}>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQSection: FC = () => {
  const { t } = useTranslation('affiliate');
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className={styles.faq}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{t('FAQ')}</h2>
          <p className={styles.subTitle}>{t('All Answers to your questions')}</p>
        </div>

        <div className={styles.faqListWrap}>
          <div className={styles.faqList}>
            {faqs.filter((item, index) => index % 2 === 0).map((faq) => (
              <FAQItem
                faq={faq}
                active={activeItem === faq.id}
                key={faq.id}
                setActive={setActiveItem}
              />
            ))}
          </div>
          <div className={styles.faqList}>
            {faqs.filter((item, index) => index % 2 !== 0).map((faq) => (
              <FAQItem
                faq={faq}
                active={activeItem === faq.id}
                key={faq.id}
                setActive={setActiveItem}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export { FAQSection };
