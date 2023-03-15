/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '../../../../i18n';
import { Option } from '../../casinoPageProviders';

import styles from './styles.module.scss';
import { useOnClickOutside } from '../../../../utils/helpers';

interface IProps {
  selectedOptions?: string[],
  onSelectedProviderChange: (selectedProviders: string[]) => void,
  optionsSportBetResult: Option[],
}

const SelectWrap: FC<IProps> = ({ onSelectedProviderChange, optionsSportBetResult, selectedOptions }) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const handleOpenProvidersSelect = () => {
    setSelectIsOpen((prev) => !prev);
  };

  const getSelectedProviderForState = useMemo(() =>
    (selectedOptions?.length ? optionsSportBetResult
      .filter((item) => selectedOptions.indexOf(item.value) !== -1)
      .map((item) => item) : []), [optionsSportBetResult, selectedOptions]);

  const providers = useMemo(() => (getSelectedProviderForState.length ? getSelectedProviderForState : optionsSportBetResult).reduce((acc, nV) => ({
    ...acc,
    [nV.value]: nV,
  }), {}), [optionsSportBetResult, getSelectedProviderForState]);

  const providersAll = useMemo(() => optionsSportBetResult.filter((item) => item.value === 'All').reduce((acc, nV) => ({
    ...acc,
    [nV.value]: nV,
  }), {}), [optionsSportBetResult, getSelectedProviderForState]);

  const [providersCount, setProvidersCount] = useState('All');
  const [selectedProviders, setSelectedProviders]: any = useState([]);
  const [isSelected, setIsSelected] = useState(true);

  const handleSelectedProviders = (elem: Option) => {
    const { All: omit, ...selectedProvidersCopy } = selectedProviders;

    setIsSelected(false);
    if (elem.value === 'All') {
      if (!selectedProvidersCopy[elem.value]) {
        setSelectedProviders(providersAll);
        onSelectedProviderChange([]);
        return;
      }
      return;
    } if (!selectedProvidersCopy[elem.value]) {
      selectedProvidersCopy[elem.value] = elem;
      if (Object.keys(providers).length - Object.keys(selectedProvidersCopy).length === 1) {
        selectedProvidersCopy.All = elem;
      }
      setSelectedProviders(selectedProvidersCopy);
    } else if (Object.keys(selectedProvidersCopy).length === 1) {
      delete selectedProvidersCopy[elem.value];
      selectedProvidersCopy.All = elem;
      setSelectedProviders(selectedProvidersCopy);
      onSelectedProviderChange([]);
      return;
    } else {
      delete selectedProvidersCopy.All;
      delete selectedProvidersCopy[elem.value];
      setSelectedProviders(selectedProvidersCopy);
    }
    const selectedProvidersNames = Object.keys(selectedProvidersCopy);
    if (!selectedProvidersNames.length) {
      onSelectedProviderChange(Object.keys(providers));
    } else {
      onSelectedProviderChange(selectedProvidersNames);
    }
  };

  useEffect(() => {
    if (isSelected) {
      setSelectedProviders(providers);
    }
  }, [optionsSportBetResult, providers]);

  const optionRenderer = (elem:Option) => (
    <div onClick={() => handleSelectedProviders(elem)} className={cx(styles.option, { [styles.selected]: selectedProviders[elem.value] })}>
      <label htmlFor={elem.value} className={cx({ [styles.active]: selectedProviders[elem.value] }, styles.checkboxLabel)}>
        <FontIcon
          name={FontIconName.Checked}
          size={12}
          className={styles.check_icon}
        />
      </label>
      <p>{t(elem.label)}</p>
      <span className={styles.games}>{elem.games}</span>
    </div>
  );

  const providerCountRenderer = () => {
    const count = optionsSportBetResult.length - Object.keys(selectedProviders).length;
    if (Object.keys(selectedProviders).length) {
      if (count === 0) {
        setProvidersCount('All');
      } else if (Object.keys(selectedProviders).length === 1) {
        setProvidersCount(selectedProviders[Object.keys(selectedProviders)[0]].label);
      } else {
        setProvidersCount(`multiple(${Object.keys(selectedProviders).length})`);
      }
    } else {
      setProvidersCount('not selected');
    }
  };

  useEffect(() => {
    providerCountRenderer();
    return () => providerCountRenderer();
  }, [selectedProviders]);

  useOnClickOutside(ref, () => setSelectIsOpen(false));

  return (
    <div className={styles.select} ref={ref}>
      <button
        className={styles.button}
        type="button"
        onClick={handleOpenProvidersSelect}
      >
        <p>
          {t('Providers')}
          :
        </p>
        {selectedProviders && (
        <div className={styles.value}>{t(providersCount)}</div>
        )}

        <FontIcon
          name={FontIconName.ChevronDown}
          size={16}
          className={cx({ [styles.active]: selectIsOpen }, styles.chevron)}
        />
      </button>

      {selectIsOpen && (
        <div className={styles.providers}>
          {optionsSportBetResult.map((item) => (
            <div key={item.value}>
              {optionRenderer(item)}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export { SelectWrap };
