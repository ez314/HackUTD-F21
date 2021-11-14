import WatchlistItem from '../WatchlistItem';
import { UserData } from "../../lib/user";
import UserInfoBar from './UserInfoBar';
import style from "./style.module.css";

interface UserContainerProps {
  user: UserData;
  watchListData: any[];
}

export default function UserContainer({user, watchListData}: UserContainerProps) {
  const stockDisplay = watchListData.map((stock) => {

  })
  return (
    <div id="usercontainer" className="flex flex-col m-0 p-0 w-fit h-screen bg-custom-gray-0">
      <UserInfoBar user={user} />
      <div className={`overflow-y-scroll overflow-x-hidden ${style.scrollable}`}>
        {
          watchListData && watchListData.map(data => {
              const lastPrice = data.price[data.price.length - 1];
              return <WatchlistItem tckr={data.ticker} name={data.name} price={lastPrice}
                                    change={lastPrice - data.prev_close} prices={data.price}/>
            }
          )
        }
      </div>
    </div>
  )
}