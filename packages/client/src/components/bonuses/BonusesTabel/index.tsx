/* eslint-disable max-len */
import React, {
  FC, Fragment, useState, useEffect, 
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { getBonuses, getClaimBonus, getCancelBonus } from 'store/bonuses/actionCreators';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { selectBonuses } from 'store/bonuses/selectors';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import { DescriptionRow } from '../BonusesTableDescriptionRow';
import { ModalType } from '../../../store/modal/types';
import { useModal } from '../../../hooks/useModal';
import { useShallowSelector } from '../../../hooks';

import styles from './styles.module.scss';
import { truncate } from '../../../utils/helpers';

const BonusesTable: FC = () => {
  const [descriptionsIndex, setDescriptionsIndex] = useState<any>([]);
  const bonuses = useShallowSelector(selectBonuses);
  const dispatch = useDispatch();

  const { t } = useTranslation('profile');
  const { showModal } = useModal();

  useEffect(() => {
    dispatch(getBonuses());
  }, []);

  const handleClaimBonuse = (id: string) => {
    dispatch(getClaimBonus({ id }));
  };

  const handleCancelBonuse = (activeBonusId: string | undefined) => {
    if (activeBonusId !== undefined) { dispatch(getCancelBonus({ activeBonusId: Number(activeBonusId) })); }
  };

  const descriptionHandler = (index: number) => {
    if (descriptionsIndex.includes(index)) {
      return setDescriptionsIndex(descriptionsIndex.filter((currentIndex: number) => currentIndex !== index));
    }
    setDescriptionsIndex([...descriptionsIndex, index]);
  };

  const checkActive = (index: any) => !!descriptionsIndex.includes(index);

  return (
    <>
      <div className={styles.title_wrap}>
        <div className={styles.title_info}>
          <h4>{t('Bonus Codes')}</h4>
          <p>{t('Do you have a bonus code')}</p>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => {
            showModal(ModalType.AddBonus)();
          }}
        >
          <>
            <span>+</span>
            {t('Add Bonus Code')}
          </>
        </button>
      </div>
      <div className={styles.table_content}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.th}>{t('Bonus Name')}</th>
              <th className={styles.th}>{t('Wagering Factor')}</th>
              <th className={styles.th}>{t('Amount')}</th>
              <th className={styles.th}>{t('Status')}</th>
            </tr>
          </thead>
          <tbody>
            {bonuses !== null && bonuses.filter((item) => item?.activeBonus?.status !== 'canceled').map(({
              name, id, activeBonus,
            }, i) => (
              <Fragment key={name + id}>
                <tr className={styles.tr} onClick={() => descriptionHandler(i)}>
                  <td className={styles.td}>{name}</td>
                  <td className={styles.td}>{`${activeBonus ? String(activeBonus?.wagerRequirement) : '0'}x`}</td>
                  <td className={styles.td}>
                    <div className={styles.amount}>
                      {activeBonus ? truncate(String(activeBonus?.bonusInUsd), 4) : '0.00'}
                      <CoinImg imgData="SBNI" className={styles.img} />
                    </div>
                  </td>
                  <td className={classNames(styles.td, styles.status)}>
                    {activeBonus?.status}
                    <button className={classNames(styles.icon, { [styles.active]: checkActive(i) })}>
                      <FontIcon name={FontIconName.IconArrowBottom} size={16} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <DescriptionRow activeBonus={activeBonus} active={checkActive(i)} handleCancelBonuse={() => handleCancelBonuse(activeBonus?.id)} handleClaimBonuse={() => handleClaimBonuse(id)} />
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { BonusesTable };
