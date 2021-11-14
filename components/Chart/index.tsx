import {Component} from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import {convertToTimeSeries} from '../../util/Charting';

interface ChartProps {
  data: any;
}

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-toolip bg-white bg-opacity-30 p-1 rounded-lg">
        <p>{label.toLocaleTimeString()}</p>
        <p>{'$' + payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default function Chart({data}: ChartProps) {
  return (
    <AreaChart
      width={400}
      height={350}
      data={convertToTimeSeries(data.price)}
      margin={{top: 50}}
    >
      <defs>
        <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={'#aaa'} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={'#aaa'} stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={"#f00"} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={"#f00"} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="timestamp" type="category"/>
      <YAxis domain={['auto', 'auto']}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip content={<CustomToolTip/>}/>
      <Area
        type="monotone"
        dataKey="price"
        stroke={
          '#40af86'
        }
        fillOpacity={1}
        fill="url(#green)"
      />
    </AreaChart>
  )
}

