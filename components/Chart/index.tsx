import {Component, HTMLProps} from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import {convertToTimeSeries} from '../../util/Charting';

interface ChartProps extends HTMLProps<HTMLElement> {
  data: any;
  width?: number;
  height?: number;
}

interface CustomToolTipProps {
  active?;
  payload?;
  label?;
}

const CustomToolTip = ({ active, payload, label }: CustomToolTipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-toolip bg-custom-gray-4 bg-opacity-30 p-1 rounded-lg">
        <p>{label.toLocaleTimeString()}</p>
        <p>{'$' + payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default function Chart(props: ChartProps) {
  const data = props.data;
  return (
    <AreaChart
      className={props.className}
      style={props.style}
      width={props.width || 400}
      height={props.height || 350}
      data={convertToTimeSeries(data.prices)}
      margin={{top: 50}}
    >
      <defs>
        <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={'#aaa'} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={'#aaa'} stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={"#357ae4"} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={"#357ae4"} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="timestamp" type="category"/>
      <YAxis domain={['auto', 'auto']}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip content={<CustomToolTip />}/>
      <Area
        type="monotone"
        dataKey="price"
        stroke={
          '#357ae4'
        }
        fillOpacity={1}
        fill="url(#blue)"
      />
    </AreaChart>
  )
}

