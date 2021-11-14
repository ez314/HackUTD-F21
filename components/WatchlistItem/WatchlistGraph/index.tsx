import React from "react";
import {
  AreaChart,
  Area, YAxis,
} from "recharts";
import {convertToTimeSeries} from "../../../util/Charting";

interface WatchlistGraphProps {
  change: number,
  prices: number[],
  tckr: string
}

export default function WatchlistGraph({tckr, change, prices}: WatchlistGraphProps) {
  const color = change > 0.00 ? "#34D399" : "#EF4444";

  return (
    <AreaChart
      width={75}
      height={35}
      data={convertToTimeSeries(prices)}
      margin={{
        top: 0,
        right: 5,
        left: 5,
        bottom: 0
      }}
    >
      <defs>
        <linearGradient id={"gradient-"+tckr} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <YAxis hide={true} domain={['auto', 'auto']}/>
      <Area
        type="linear"
        dataKey="price"
        stroke={color}
        fillOpacity={1}
        fill={`url(#gradient-${tckr})`}
      />
    </AreaChart>
  );
}
