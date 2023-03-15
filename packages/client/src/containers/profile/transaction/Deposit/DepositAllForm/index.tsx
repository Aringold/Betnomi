import React, { ChangeEventHandler, FormEventHandler } from 'react';
import Button from '@betnomi/libs/components/Button';
import { Option, Select } from '@betnomi/libs/components/Select';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import cx from 'classnames';
import { CoinSelect } from '@betnomi/libs/components/CoinSelect';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { CoinWithAllType } from '@betnomi/libs/types';

import styles from './styles.module.scss';

interface IProps {
  loading?: boolean;
  resultType: Option<string>;
  assetType: CoinWithAllType;
  time: Option<string>;
  secondLabel: string;
  thirdLabel: string;
  fourthLabel: string;
  buttonText: string;
  fifthLabel: string;
  txID: string;
  onTxIDChange: ChangeEventHandler<HTMLInputElement>;
  ClassName?: string;

  onSubmit: FormEventHandler<HTMLFormElement>;
  onTimeChange: (item: Option<string>) => void;
  onResultChange: (item: Option<string>) => void;
  onAssetsChange: (val: CoinWithAllType) => void;
  timeOptions: Option<string>[];
  resultOptions: Option<string>[];
}

export const DepositAllForm: React.FC<IProps> = ({
  onSubmit,
  onTimeChange,
  onResultChange,
  onAssetsChange,
  timeOptions,
  resultOptions,
  resultType,
  assetType,
  time,
  fifthLabel,
  loading,
  secondLabel,
  thirdLabel,
  fourthLabel,
  onTxIDChange,
  buttonText,
  ClassName = '',
  txID,
}) => {
  const optionRenderer = (active:Option<string>) => ({ label, value }:Option<string>) => (
    <div className={cx(styles.option, { [styles.selected]: value === active.value })}>
      {label}
      {value === active.value && (
      <FontIcon
        name={FontIconName.Checked}
        size={16}
        className={styles.check_icon}
      />
      )}
    </div>
  );

  return (
    <form className={cx(styles.form, styles[ClassName])} onSubmit={onSubmit}>
      <div className={styles.filters}>
        <div className={styles.result}>
          <div className={styles.label}>{thirdLabel}</div>
          <CoinSelect<CoinWithAllType>
            withName
            withLine
            withAll
            onSelect={onAssetsChange}
            selected={assetType}
            className={cx(styles.select, styles.coin)}
            disabled={loading}
          />
        </div>
        <div className={styles.result}>
          <div className={styles.label}>{fourthLabel}</div>
          <Select
            variants={resultOptions}
            onChange={onResultChange}
            value={resultType}
            optionRenderer={optionRenderer(resultType)}
            className={styles.select}
            disabled={loading}
          />
        </div>
        <div className={styles.result}>
          <div className={styles.label}>{secondLabel}</div>
          <Select
            variants={timeOptions}
            onChange={onTimeChange}
            value={time}
            optionRenderer={optionRenderer(time)}
            className={styles.select}
            disabled={loading}
          />
        </div>
        <div className={styles.TxID}>
          <div className={styles.label}>{fifthLabel}</div>
          <TextInput
            value={txID}
            onChange={onTxIDChange}
            placeholder="Enter TxID"
            inputClasses={styles.background}
          />
        </div>
      </div>
      <Button
        type="submit"
        isLoading={loading} 
        className={styles.submit}
      >
        {buttonText}
      </Button>
    </form>
  ); 
};
