import React, { FC } from 'react';
import {
  AreaChart, Area, CartesianGrid, ResponsiveContainer, 
} from 'recharts';

import styles from './styles.module.scss';

interface Props {
}

const GameLiveStatsChart: FC<Props> = () => {
  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400, 
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210, 
    },
    {
      name: 'Page C', uv: 2000, pv: 0, amt: 2290, 
    },
    {
      name: 'Page D', uv: 2780, pv: -1080, amt: 2000, 
    },
    {
      name: 'Page D', uv: 2780, pv: -2008, amt: 2000, 
    },
    {
      name: 'Page D', uv: 2780, pv: -1008, amt: 2000, 
    },
    {
      name: 'Page D', uv: 2780, pv: 0, amt: 2000, 
    },
    {
      name: 'Page D', uv: 2780, pv: 1000, amt: 2000, 
    },
    {
      name: 'Page D', uv: 2780, pv: 2000, amt: 2000, 
    },
  ];

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.pv));
    const dataMin = Math.min(...data.map((i) => i.pv));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className={styles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={435}
          height={100}
          data={data}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset={0} stopColor="#6AD035" stopOpacity={0.1} />
              <stop offset={off} stopColor="#292e42" stopOpacity={0.5} />
              <stop offset={100} stopColor="#CC193E" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#6AD035" stopOpacity={1} />
              <stop offset={off} stopColor="#CC193E" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="pv"
            stroke="url(#splitColor)"
            fill="url(#gradient)"
            strokeWidth={3}
            dot={false}
            activeDot={false}
          />
          <CartesianGrid stroke="#313549" vertical={false} strokeDasharray="4 4" />

        </AreaChart>
      </ResponsiveContainer>
    </div>

  );
};

export default GameLiveStatsChart;
