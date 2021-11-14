import { Component } from 'react';
import Stock, { StockData } from '../Stock';

interface MainContainerProps {
  data: StockData;
}

export default function MainContainer({ data }: MainContainerProps) {
  return (
    <div id="maincontainer" className="flex flex-row m-0 p-0 w-70p h-screen bg-green-400">
      <div>test</div>
      <div>test</div>
      <div>test2</div>
    </div>
  )
}