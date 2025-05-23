import React, { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import { CoinSelect } from '@betnomi/libs/components/CoinSelect';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Button, Coin } from '@betnomi/libs/components';
import { ButtonColor, coinNames, CoinType } from '@betnomi/libs/types';
import { CopyText } from '@betnomi/libs/components/CopyText';
import QrCode from '@betnomi/libs/components/QrCode';
import useShallowSelector from 'hooks/useShallowSelector';
import { selectAuthUI } from 'store/auth/selectors';
import { formatNumber } from '../../../utils/helpers';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

interface Props {
  coin: CoinType;
  network?: CoinType;
  balance?: number;
  arrivalTime: number;
  depositAddress: string;
  depositTag: string;
  networks?: CoinType[];
  isLoadingDepositAddress?: boolean;
  onAddressCopy?: () => void;
  onChangeCoin: (val: CoinType) => void;
  onChangeNetwork: (val: CoinType) => void;
  isMobile: boolean;
}

const WalletDepositForm: FC<Props> = ({
  coin,
  balance,
  arrivalTime,
  depositAddress,
  depositTag,
  network,
  networks,
  isLoadingDepositAddress,
  onAddressCopy,
  onChangeCoin,
  onChangeNetwork,
  isMobile, 
}) => {
  const { t } = useTranslation('profile');
  const networkName = network || coin;

  const { isChatActive, isMenuActive } = useShallowSelector(selectAuthUI);
  const midScreen = window.matchMedia('(min-width:1023px) and (max-width: 1201px)').matches;

  return (
    <div className={(midScreen && isChatActive) || (midScreen && isMenuActive) ? styles.compressed : ''}>
      <p className={styles.label}>{t('Select Coin')}</p>
      <div className={styles.container}>
        <div className={styles.left}>
          <CoinSelect onSelect={onChangeCoin} selected={coin} className={styles.selectCoin} withName withLine exception={CoinType.sbni} />
          <div className={styles.balance}>
            <span className={styles.balance_label}>{t('Available balance')}</span>
            <span className={styles.balance_value}>{`${balance ? formatNumber(String(balance), 6) : 0} ${coin}`}</span>
          </div>
          <div className={styles.notice}>
            <FontIcon name={FontIconName.Dark} className={styles.notice_icon} />
            <div>{t('Deposit Notice')}</div>
          </div>
          <p className={styles.notice_item}>
            {t(
              '1. If you have deposited, please pay attention to the text messages, site letters and emails we send to you.',
            )}
          </p>
          <p className={styles.notice_item}>
            {t('Coins will be deposited after ')}
            <span className={styles.notice_link}>
              {t('{{count}} network', { count: 1 })}
            </span>
            {t(' confirmations')}
          </p>
        </div>
        <div className={styles.right}>
          {networks && networks.length > 1 && (
            <div className={styles.tabs}>
              {networks.map((target) => (
                <Button
                  className={styles.mobile_button}
                  color={network === target ? ButtonColor.Primary : ButtonColor.Secondary}
                  type="button"
                  key={target}
                  onClick={() => onChangeNetwork(target)}
                >
                  {target}
                </Button>
              ))}
            </div>
          )}

          <div className={styles.network}>
            <div className={styles.description}>
              <p>
                Network name: 
                {' '}
                <span className={isMobile ? styles.white_color : ''}>{coinNames[networkName]}</span>
              </p>
            </div>
            <div className={styles.description}>
              <p>
                Average arrival time 
                {' '}
                <span className={isMobile ? styles.white_color : ''}>
                  {arrivalTime}
                  {' '}
                  minutes
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className={styles.qr_out}>
            <div className={styles.address}>
              <div className={styles.address_label}>{t('Address')}</div>
              <CopyText
                text={isLoadingDepositAddress ? t('Loading') : depositAddress}
                disabled={isLoadingDepositAddress}
                onCopy={onAddressCopy}
                className={styles.buttonStyle}
              />
              {
                depositTag && depositTag !== '0' && (
                  <div className={styles.tag}>
                    <div className={styles.address_label}>
                      {t('Tag')}
                      <span data-tip data-for="DestinationTagInfo">
                        <FontIcon name={FontIconName.Info} size={16} />
                      </span>
                      <ReactTooltip className={styles.infoTooltip} id="DestinationTagInfo" type="dark" effect="solid">
                        {t('The destination tag is required for XRP deposits. Please include the tag else, your coins may be lost forever.')}
                      </ReactTooltip>
                    </div>
                    <CopyText
                      text={isLoadingDepositAddress ? t('Loading') : depositTag}
                      disabled={isLoadingDepositAddress}
                      className={styles.buttonStyle}
                    />
                  </div>
                )
              }
            </div>
            <div className={styles.qr}>
              <QrCode value={depositAddress} />
            </div>
          </div>
          <hr />
          <div className={styles.send_label}>
            {t('Send only {{networkName}} to this deposit address', { networkName })}
          </div>
          <div className={styles.send_info}>
            <p>
              {t(
                'Sending coin or token other than {{networkName}} to this address may result in the loss of your deposit.',
                { networkName },
              )}
            </p>
            {!isMobile && <Coin coin={networkName} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export { WalletDepositForm };
