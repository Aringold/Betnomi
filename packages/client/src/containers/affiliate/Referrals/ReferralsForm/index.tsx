import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { Option, Select } from '@betnomi/libs/components/Select';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import cx from 'classnames';
import { TextInput } from '@betnomi/libs/components/TextInput';
import styles from './styles.module.scss';

interface IProps {
  loading?: boolean;
  sortByType: Option<string>;
  campaignType: Option<string>;
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  ClassName?: string;
  userName: string;
  userNameChange: ChangeEventHandler<HTMLInputElement>;
  sortByeChange: (item: Option<string>) => void;
  campaignChange: (item: Option<string>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  sortByOptions: Option<string>[];
  campaignOptions: Option<string>[];
}

export const optionRenderer = (active:Option<string>) => ({ label, value }:Option<string>) => (
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
  
export const ReferralsForm: React.FC<IProps> = ({
  onSubmit,
  sortByeChange,
  campaignChange,
  sortByOptions,
  campaignOptions,
  sortByType,
  campaignType,

  loading,
  userName,
  userNameChange,
  firstLabel,
  secondLabel,
  thirdLabel,
  ClassName = '',
}) => (
  <form className={cx(styles.form, styles[ClassName])} onSubmit={onSubmit}>
    <div className={styles.filters}> 
      <div className={styles.type}>
        <div className={styles.label}>{firstLabel}</div>
        <Select
          variants={campaignOptions}
          onChange={campaignChange}
          value={campaignType}
          optionRenderer={optionRenderer(campaignType)}
          className={styles.select}
          disabled={loading}
        />
      </div>
      <div className={styles.result}>
        <div className={styles.label}>{secondLabel}</div>
        <Select
          variants={sortByOptions}
          onChange={sortByeChange}
          value={sortByType}
          optionRenderer={optionRenderer(sortByType)}
          className={styles.select}
          disabled={loading}
        />
      </div>
      <div className={styles.TxID}>
        <div className={styles.label}>{thirdLabel}</div>
        <TextInput
          value={userName}
          onChange={userNameChange}
          placeholder="username"
          inputClasses={styles.background}
        />
      </div>
    </div>

  </form>
);
