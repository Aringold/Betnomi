/* eslint-disable react/no-array-index-key */
import React, {
  FC, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import { Option, Select } from '@betnomi/libs/components/Select';
import { optionRenderer } from '../Referrals/ReferralsForm';
import styles from './styles.module.scss';

interface Props{
}

const data = [
  {
    name: '1 January',
    uv: 4000,
    pv: 2400,
    av: 1400,
    bv: 200,
    cv: 0,
    amt: 2400,
  },
  {
    name: '2 January',
    uv: 3000,
    pv: 2398,
    av: 1100,
    bv: 200,
    cv: 0,
    amt: 2210,
  },
  {
    name: '3 January',
    uv: 2000,
    pv: 4000,
    av: 1410,
    bv: 200,
    cv: 0,
    amt: 2290,
  },
  {
    name: '4 January',
    uv: 2780,
    pv: 3908,
    av: 3400,
    bv: 200,
    cv: 0,
    amt: 2000,
  },
  {
    name: '5 January',
    uv: 1890,
    pv: 4000,
    av: 1300,
    bv: 200,
    cv: 0,
    amt: 2181,
  },
];

const Analytics: FC<Props> = () => {
  const { t } = useTranslation('profile');

  const CampaignNameOptions = [
    { label: t('All'), value: 'All' },
    { label: t('Mango'), value: 'Mango' },
    { label: t('Abibas'), value: 'Abibas' },
  ];

  const legendOptions = [
    { label: t('Sign ups'), data: 'uv', color: '#3dcc4a' },
    { label: t('Active user'), data: 'pv', color: '#8048F7' },
    { label: t('First time deposits'), data: 'av', color: '#FFA325' },
    { label: t('Total deposit'), data: '', color: '#E4F2FF' },
    { label: t('Commission'), data: 'bv', color: '#2B83D4' },
    { label: t('Clicks'), data: 'cv', color: '#55B88D' },
  ];

  const [fieldValue, setFieldValue] = useState({ label: t('All'), value: 'All' });
  const [Index, setIndex] = useState(0);

  const onChangeCampaign = useCallback((item:Option<string>) => {
    setFieldValue(item);
  }, [setFieldValue]);

  const CustomTooltip = ({
    active, payload,
  }: any) => {
    const index = Index;

    if (active) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.name}>{payload[index].payload.name}</p>
          <p className={styles.intro}>
            <span style={{ backgroundColor: payload[index].color }} className={styles.dot} />
            {`${payload[index].unit} : ${payload[index].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.selectWrap}>
        <div className={styles.type}>
          <div className={styles.label}>{t('Campaingn Name')}</div>
          <Select
            variants={CampaignNameOptions}
            onChange={onChangeCampaign}
            value={fieldValue}
            optionRenderer={optionRenderer(fieldValue)}
            className={styles.select}
          />
        </div>

      </div>

      <div className={styles.chartWrap}>
        <h2 className={styles.title}>{t('Profit')}</h2>

        <div className="ui-chart">
          <ResponsiveContainer className={styles.chart} width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: -20,
              }}
            >
              <CartesianGrid stroke="#313549" vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="name" tickSize={15} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} />

              <Tooltip cursor={false} content={<CustomTooltip />} />

              {legendOptions.filter((item) => item.data).map((item, index) => (
                <Line
                  key={item.label}
                  type="monotone"
                  dot={false}
                  unit={item.label}
                  dataKey={item.data}
                  stroke={item.color}
                  strokeWidth={2}
                  activeDot={{
                    stroke: '#fff',
                    strokeWidth: 5,
                    r: 8,
                    onMouseOver: () => setIndex(index),
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.legendList}>
          {legendOptions.map((item, index) => (
            <div key={`${item.label} + ${index}`}>
              <span style={{ backgroundColor: item.color }} className={styles.legendColor} />
              <span className={styles.legendLabel}>{t(item.label)}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Analytics;
