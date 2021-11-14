import { Component } from 'react';
import Stock, { StockData } from '../Stock';
import Tweet from '../Tweet';

interface MainContainerProps {
  data: StockData;
}

export default function MainContainer({ data }: MainContainerProps) {
  return (
    <div id="maincontainer" className="flex flex-row m-0 p-0 w-70p h-screen bg-green-400">
      <Tweet photo="https://d25tv1xepz39hi.cloudfront.net/2017-12-12/files/eos-6d-mark-ii-sample-image_1723-1.jpg" name="Elon Musk" handle="@elonmusk" content="haha tesla stock message" date="2021/05/01" likes={5} retweets={10} />
    </div>
  )
}