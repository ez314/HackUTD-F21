
import { Component } from 'react';
import { getUser } from '../../lib/user';
import WatchlistItem from '../WatchlistItem';
import Tweet from '../Tweet';
import Chart from '../Chart';
import MinusIcon from '../icon/MinusIcon';
import PlusIcon from '../icon/PlusIcon';
import { UserData } from "../../lib/user";
import style from "./style.module.css"

interface MainContainerProps {
  data: any;
  user: UserData;
  tckr;
  updateWatchlist;
}

export default function MainContainer({ data, tckr, user, updateWatchlist }: MainContainerProps) {
  const posTweets = data && data.pos_tweets && data.pos_tweets.map(tweet => (<Tweet extra="my-0" photo={tweet.profile_pic} name={tweet.name} handle={`@${tweet.username}`} 
    content={tweet.content || "This stock is really good!"} likes={tweet.likes_count} retweets={tweet.retweets_count} link={tweet.link} />))

  const negTweets = data && data.neg_tweets && data.neg_tweets.map(tweet => (<Tweet extra="my-0" photo={tweet.profile_pic} name={tweet.name} handle={`@${tweet.username}`} 
    content={tweet.content || "This stock is really bad!"} likes={tweet.likes_count} retweets={tweet.retweets_count} link={tweet.link} />))

  return (
    <div id="maincontainer" className={`flex flex-row m-0 p-0 justify-center w-full h-full bg-custom-gray-1 overflow-y-scroll items-start ${style.scrollable}`}>
      {(!data || !user) && <div className="text-center text-2xl font-black justify-self-center self-center">No data found for {tckr}</div>}
      {data && user && <div className="flex flex-col justify-center my-10">
        <div className="flex flex-row items-center mx-auto w-full">
          {user.watchlist.includes(tckr) ? <div className="flex flex-row items-center justify-center cursor-pointer w-max p-1 px-2 rounded-xl border-4 border-custom-red text-custom-red hover:border-transparent hover:text-custom-gray-2 hover:bg-custom-red transition" onClick={() => {
            user.watchlist = user.watchlist.filter((f) => f !== tckr);
            updateWatchlist(user, tckr);
          }}>
              <MinusIcon className="w-6 h-6 mr-2" />
              <div className="text-sm font-extrabold">Unwatch</div>
          </div> : <div className="flex flex-row items-center justify-center cursor-pointer w-max p-1 px-2 rounded-xl border-4 border-custom-green text-custom-green hover:border-transparent hover:text-custom-gray-2 hover:bg-custom-green transition" onClick={() => {
              user.watchlist = user.watchlist.concat(tckr);
              updateWatchlist(user, tckr);
              //window.location.reload();
          }}>
              <PlusIcon className="w-6 h-6 mr-2" />
              <div className="text-sm font-extrabold">Watch</div>
          </div>}
          
          <div className="text-2xl font-black ml-10">{tckr} | {data.name}</div>
        </div>
        <div className="mb-10">
        <Chart data={data} width={700}></Chart>
        </div>
        { data &&
        (<div className="grid grid-cols-2">
          <h1 className="text-l"><span className="font-bold">Day Hi: </span>{data.day_high.toFixed(2)}</h1>
          <h1 className="text-l"><span className="font-bold">Day Vol: </span>{data.day_vol}</h1>
          <h1 className="text-l"><span className="font-bold">Day Lo: </span>{data.day_low.toFixed(2)}</h1>
          <h1 className="text-l"><span className="font-bold">Dividend Rate: </span>{data.dividend_rate ? data.dividend_rate: "N/A"}</h1>
          <h1 className="text-l"><span className="font-bold">Year Hi: </span>{data["52_wk_high"]}</h1>
          <h1 className="text-l"><span className="font-bold">Sentiment Ratio: </span>{"+"+data.pos_tweet_count+"/-"+data.neg_tweet_count}</h1>
          <h1 className="text-l"><span className="font-bold">Year Lo: </span>{data["52_wk_low"]}</h1>
          <h1 className="text-l"><span className="font-bold">Market Cap: </span>{data.market_cap}</h1>
          <h1 className="text-l"><span className="font-bold">Short Ratio: </span>{data.short_ratio}</h1>
          <h1 className="text-l"><span className="font-bold">Sector: </span>{data.sector}</h1>
          

        </div>)
        }
        <br/>
        <hr/>

        <div className="py-8">
          <h1 className="text-xl pb-2 font-bold">Positive Tweets</h1>
          <div className="flex flex-row items-start space-x-4">
            {posTweets}
          </div>
        </div>

        <div className="py-4">
          <h1 className="text-xl pb-2 font-bold">Negative Tweets</h1>
          <div className="flex flex-row items-start space-x-4">
            {negTweets}
          </div>
        </div>
      </div>}
    </div>
  )
}