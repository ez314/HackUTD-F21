import React from "react";
import {
  AreaChart,
  Area,
} from "recharts";

interface WatchlistGraphProps {
  change: number,
  prices: number[],
  tckr: string
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function WatchlistGraph({tckr, change, prices}: WatchlistGraphProps) {
  const color = change > 0.00 ? "#34D399" : "#EF4444";

  return (
    <AreaChart
      width={75}
      height={35}
      data={data}
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

      <Area
        type="linear"
        dataKey="uv"
        stroke={color}
        fillOpacity={1}
        fill={`url(#gradient-${tckr})`}
      />
    </AreaChart>
  );
}
