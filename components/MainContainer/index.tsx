
import { Component } from 'react';
import { getUser } from '../../lib/user';
import WatchlistItem from '../WatchlistItem';
import Tweet from '../Tweet';
import Chart from '../Chart';
import MinusIcon from '../icon/MinusIcon';
import PlusIcon from '../icon/PlusIcon';
import { UserData } from "../../lib/user";

interface MainContainerProps {
  data: null;
  user: UserData;
  tckr;
  updateWatchlist;
}

export default function MainContainer({ data, tckr, user, updateWatchlist }: MainContainerProps) {
  
  return (
    <div id="maincontainer" className="flex flex-row m-0 p-0 justify-center w-full h-screen bg-custom-gray-1">
      {(!data || !user) && <div className="text-center text-2xl font-black justify-self-center self-center">No data found for {tckr}</div>}
      {data && user && <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center m-auto w-full">
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
          
          <div className="text-2xl font-black ml-10">{tckr}</div>
        </div>
        <Chart data={data} width={700}></Chart>
        <Tweet photo="https://d25tv1xepz39hi.cloudfront.net/2017-12-12/files/eos-6d-mark-ii-sample-image_1723-1.jpg"
        name="Elon Musk" handle="@elonmusk" content="haha tesla stock message. this is more tweet about tesla haha tesla stock is down because i am sell it !" date="2021/05/01" likes={5}
        retweets={10} />
      </div>}
    </div>
  )
}