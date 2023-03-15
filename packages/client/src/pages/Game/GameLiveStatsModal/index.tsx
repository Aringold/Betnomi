import React, { FC, useCallback, useState } from 'react';

import { Option, Select } from '@betnomi/libs/components/Select';
import { Button } from '@betnomi/libs/components';
import Coin from '@betnomi/libs/components/Coin';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';

import statsIcon from '@betnomi/libs/assets/img/icons/stats.svg';
import refreshIcon from '@betnomi/libs/assets/img/icons/refresh.svg';
import { selectViewInFiatCurrency } from 'store/settings/selectors';
import { useTranslation } from '../../../i18n';
import { HocModal } from '../../../components/modal/HocModal';
import { ModalComponentProps } from '../../../components/modal/Modal';
import { useShallowSelector } from '../../../hooks';
import { selectAuth } from '../../../store/auth/selectors';
import LiveStatsChart from '../GameLiveStatsChart';

import styles from './styles.module.scss';

interface Props extends ModalComponentProps {
}

export const GameLiveStatsModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');
  const viewInFiatCurrency = useShallowSelector(selectViewInFiatCurrency);
  const { currency } = useShallowSelector(selectAuth);
  const [fieldValue, setFieldValue]: any = useState({ label: t('All'), value: 'All' });

  const onChangeType = useCallback((item: Option<string>) => {
    setFieldValue(item);
  }, [setFieldValue]);

  const optionsStat = [
    { label: t('All'), value: 'All' },
    { label: t('Wager contest'), value: 'Wager contest' },
    { label: t('Bets'), value: 'Bets' },
  ];

  return (
    <HocModal
      title={(
        <span className={styles.headIcon}>
          <img src={statsIcon} alt="stats Icon" />
          {t('Live Stats')}
        </span>
)}
      onClose={onCloseModal}
    >

      <div className={styles.modalContent}>
        <div className={styles.selectWrap}>
          <Select
            variants={optionsStat}
            onChange={onChangeType}
            value={fieldValue}
            className={styles.select}
          />
          <Button size={44} className={styles.button}>
            <img src={refreshIcon} alt="refresh Icon" />
          </Button>
        </div>

        {(fieldValue.value === 'Bets' || fieldValue.value === 'All') && (
        <div className={styles.betsWrap}>
          <div className={styles.bets}>
            <div>
              <p className={styles.label}>Profit</p>
              <p className={styles.profit}>
                <span> 
                  {' '}
                  {viewInFiatCurrency && (<span>$</span>)}
                  {' '}
                  -0.000000
                </span>
                {!!currency && <Coin coin={currency} size={24} />}
              </p>
            </div>
            <div>
              <p className={styles.label}>Wagered</p>
              <p className={styles.wagered}>
                <span> 
                  {' '}
                  {viewInFiatCurrency && (<span>$</span>)}
                  {' '}
                  0.000000
                </span>
                {!!currency && <Coin coin={currency} size={24} />}
              </p>
            </div>
          </div>

          <div className={styles.winsWrap}>
            <div>
              <span className={styles.label}>Wins</span>
              <span className={styles.wins}>243</span>
            </div>
            <div>
              <span className={styles.label}>Losses</span>
              <span className={styles.lose}>492</span>
            </div>
          </div>

          <LiveStatsChart />

        </div>
        )}

        {(fieldValue.value === 'Wager contest' || fieldValue.value === 'All') &&
          (
          <div className={styles.wagerContest}>
            <p className={styles.label}>
              $ 1,000,000 - 30 days
              <FontIcon
                name={FontIconName.IconArrowBottom}
                size={16}
              />
            </p>
            <div className={styles.progressbarWrap}>
              <p>in 11 days</p>
              <div className={styles.progressbar}>
                <span style={{ width: '30%' }} />
              </div>
            </div>
            <div className={styles.bets}>
              <div>
                <p className={styles.label}>Prize</p>
                <p className={styles.profit}>
                  <span>
                    {' '}
                    {viewInFiatCurrency && (<span>$</span>)}
                    {' '}
                    0.000000
                  </span>
                  <Coin coin={currency} size={24} />
                </p>
              </div>
              <div>
                <p className={styles.label}>Wagered</p>
                <p className={styles.wagered}>
                  <span>
                    {' '}
                    {viewInFiatCurrency && (<span>$</span>)}
                    {' '}
                    0.000000
                  </span>
                  <Coin coin={currency} size={24} />
                </p>
              </div>
            </div>
          </div>
          )}

      </div>
    </HocModal>
  );
};
