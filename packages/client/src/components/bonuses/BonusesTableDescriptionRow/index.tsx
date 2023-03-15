import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import stylesNames from 'classnames';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import Labeled from '@betnomi/libs/components/RangeBarLabeled';
import ClockIcon from '@betnomi/libs/assets/img/icons/clock.svg';
import styles from './styles.module.scss';
import Tooltip from '../../common/Tooltip';
import { ActiveBonusData } from '../../../types/store/bonuses';
import { truncate } from '../../../utils/helpers';

interface Props {
  active?: boolean;
  handleClaimBonuse: () => void;
  handleCancelBonuse: () => void;
  activeBonus: ActiveBonusData | undefined
}

interface RowProps {
  name: string;
  value: string;
  clock?: boolean;
}

const getNumberOfDays = (start: number, end: number) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = end - start;
  return Math.round(diffInTime / oneDay);
};

const Row: FC<RowProps> = ({ name, value, clock }) => {
  const { t } = useTranslation('profile');
  return (
    <div className={styles.row_wrap}>
      {clock && <img src={ClockIcon} width={12} height={12} alt="clock icon" />}
      <span>{`${t(name)}:`}</span>
      <span className={styles.white_color}>{value}</span>
    </div>
  );
};

const DescriptionRow: FC<Props> = ({
  activeBonus, active, handleClaimBonuse, handleCancelBonuse,
}) => {
  const history = useHistory();

  const progressPercentage = Number(parseFloat(truncate(String((Number(activeBonus?.totalBetInUsd) / Number(activeBonus?.targetInUsd)) * 100), 3)).toFixed(2));
  const startsAt = useMemo(() => (activeBonus ? format(new Date(Number(activeBonus?.startsAt) * 1000), 'dd/MM/yyyy HH:mm') : '0'), [activeBonus]);
  const endsAt = useMemo(() => (activeBonus ? format(new Date(Number(activeBonus?.endsAt) * 1000), 'dd/MM/yyyy HH:mm') : '0'), [activeBonus]);

  return (
    <div className={stylesNames(styles.wrap, { [styles.active]: active })}>
      <div className={styles.left_panel}>
        <div className={styles.value}>
          <Row name="Wagered" value={`${activeBonus ? activeBonus.totalBetInUsd : '0.00'} SBNI`} />
          <Row name="Remaining" value={`${activeBonus ? truncate(String(activeBonus.targetInUsd), 2) : '0.00'} SBNI`} />
        </div>
        <div className={styles.range}>
          <Labeled value={activeBonus ? progressPercentage > 100 ? 100 : progressPercentage : 0} disabled step={0.01} />
        </div>
        <div className={styles.info_wrap}>
          <div className={styles.date_wrap}>
            <Row name="Starting time" value={startsAt} clock />
            <Row name="Ending Date" value={endsAt} clock />
          </div>
          <div className={styles.wager_info}>
            <Row name="Time to Wager" value={`${activeBonus ? getNumberOfDays(Number(activeBonus?.startsAt) * 1000, Number(activeBonus?.endsAt) * 1000) : '0'} days`} />
            <Row name="Wagering Req" value={`${activeBonus ? String(activeBonus?.wagerRequirement) : '0'}x`} />
          </div>
          <Row name="Min/Max deposit" value="$ 100 / $ 1000" />
        </div>
      </div>
      <div className={styles.buttons_wrap}>
        {activeBonus?.status === 'active' ?
          <button onClick={handleCancelBonuse} className={styles.cancel_button}>Cancel</button>
          :
          <button onClick={handleClaimBonuse} disabled={activeBonus?.status !== 'eligible'} className={stylesNames(styles.confirm_button, { [styles.noActive]: activeBonus?.status === 'eligible' })}>Claim Bonus</button>}
        <Tooltip content={(
          <div className={styles.informtion_tooltip}>
            <p>Bonus amount: up to 150 SBNI - Wagering requirement - 40X, the bonus will be valid for 7 days</p>
            <button onClick={() => history.push('/promotions/landing')}>Read More</button>
          </div>
      )}
        >
          <button className={styles.information_button}>
            <FontIcon name={FontIconName.Info} size={16} />
            Information
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export { DescriptionRow };
