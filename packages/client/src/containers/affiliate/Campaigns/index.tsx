/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CopyPopover } from '@betnomi/client/src/components/common/CopyPopover';
import classNames from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { modalShow } from '../../../store/modal/actionCreators';
import { ModalType } from '../../../store/modal/types';
import { affiliateGetCampaigns } from '../../../store/affiliate/actionCreators';
import { campaignsAllInitialValues } from '../../../hooks/formik/useCampaignsForm';
import { useShallowSelector } from '../../../hooks';
import { selectAffiliateCampaigns } from '../../../store/affiliate/selectors';
import { Pagination } from '../../../components/common/Pagination';
import styles from './styles.module.scss';

interface Props {
}

const Campaigns: FC<Props> = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const {
    code,
    total,
    offset,
    limit,
  } = useShallowSelector(selectAffiliateCampaigns);

  const [descriptionsIndex, setDescriptionsIndex] = useState<any>([]);

  const descriptionHandler = (index: number) => {
    if (descriptionsIndex.includes(index)) {
      return setDescriptionsIndex(descriptionsIndex.filter((currentIndex: number) => currentIndex !== index));
    }
    setDescriptionsIndex([...descriptionsIndex, index]);
  };

  const onOpenCreateCampaignsModal = useCallback(
    () => dispatch(modalShow(ModalType.CreateCampaign)),
    [dispatch],
  );

  const checkActive = (index: number) => descriptionsIndex.includes(index);

  const handlePaginate = (data: any) => {
    dispatch(affiliateGetCampaigns({
      ...campaignsAllInitialValues,
      offset: data.offset,
      limit: data.limit,
    }));
  };

  useEffect(() => {
    dispatch(affiliateGetCampaigns(campaignsAllInitialValues));
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <div className={styles.title_info}>
          <h4>{t('Campaigns')}</h4>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => onOpenCreateCampaignsModal()}
        >
          <>
            <span>+</span>
            {t('Create Campaigns')}
          </>
        </button>
      </div>

      <div className={styles.campaigns}>
        {Object.values(code || []).map((item, index) => (
          <div className={styles.campaign} key={`c-${item.code}`}>
            <div onClick={() => descriptionHandler(index)} className={styles.topContent}>
              <p className={styles.title}>{item.campaignName}</p>
              <p className={styles.url}>{item.url}</p>
              <CopyPopover className={styles.copy} text={item.url} />
              {
                item.details && item.details.length && (
                  <button className={classNames(styles.icon, { [styles.active]: checkActive(index) })}>
                    <FontIcon name={FontIconName.IconArrowBottom} size={16} />
                  </button>
                )
              }
            </div>
            {
              item.details && item.details.length && (
                <div className={classNames(styles.descriptionTabWrap, { [styles.active]: checkActive(index) })}>
                  <div className={styles.descriptionTab}>
                    <ul>
                      <li>
                        <span className={styles.deckName}>
                          {`${t('name')}: `}
                        </span>
                        <span className={styles.value}>
                          {' '}
                          {item.campaignName}
                          {' '}
                        </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('Created')}
                          {' '}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 6/18/2021 </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('Commission Rate')}
                          {' '}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 10% </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('Last Deposits')}
                          {' '}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 6/25/2021 </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('Sign Ups')}
                          {' '}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 123 </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('Active Users')}
                          {' '}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 2234 </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('First Time Deposits')}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 62 </span>
                      </li>
                      <li>
                        <span className={styles.deckName}>
                          {' '}
                          {t('Total Deposits')}
                          {' '}
                          :
                          {' '}
                        </span>
                        <span className={styles.value}> 23 </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )
            }
          </div>
        ))}
        {
          Number(total) > limit && <Pagination total={Number(total)} limit={limit} onChange={handlePaginate} currentPage={offset} />
        }
      </div>
    </div>
  );
};

export default Campaigns;
