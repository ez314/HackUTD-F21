import {Component} from 'react';
import GlobalHeader from './GlobalHeader';
import GlobalElem from './GlobalElem';
import style from "./style.module.css";

interface GlobalContainerProps {
  curStockCallback: any;
  setSelected: any;
  stocks: any
}

export default function GlobalContainer({curStockCallback, setSelected, stocks}: GlobalContainerProps) {
  let stocksCopy = Object.values(stocks);
  stocksCopy.sort((a: any, b: any) => {
    if (a.pos_tweet_count + a.neg_tweet_count == b.pos_tweet_count + b.neg_tweet_count) {
      return Math.abs(b.pos_tweet_count - b.neg_tweet_count) / (b.pos_tweet_count + b.neg_tweet_count) - Math.abs(a.pos_tweet_count - a.neg_tweet_count) / (a.pos_tweet_count + a.neg_tweet_count);
    }
    return (b.pos_tweet_count + b.neg_tweet_count) - (a.pos_tweet_count + a.neg_tweet_count);
  }).splice(9);

  return (
    <div id="globalcontainer" className="flex flex-col m-0 p-0 w-25p h-screen bg-custom-gray-0">
      <input id={style.watchlistsearch} type="text" placeholder="Search..."
             className="bg-custom-gray-2 w-48 h-9 m-3 p-4 border-2 rounded-3xl border-custom-gray-2"
             onKeyPress={(key) => {
               if (key.code === "Enter") {
                 setSelected((document.getElementById(style.watchlistsearch) as HTMLInputElement).value.toUpperCase());
               }
             }}></input>
      <div className={`overflow-y-scroll overflow-x-hidden ${style.scrollable}`}>
        {
          stocksCopy && stocksCopy.map((stock, i) => <GlobalElem tckr={stock.ticker} name={stock.name}
                                                                 sentiment={stock.pos_tweet_count - stock.neg_tweet_count}
                                                                 idx={i}
                                                                 curStockCallback={curStockCallback}/>)
        }
      </div>
    </div>
  )
}