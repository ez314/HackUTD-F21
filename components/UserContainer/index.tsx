import WatchlistItem from '../WatchlistItem';
import { UserData } from "../../lib/user";
import UserInfoBar from './UserInfoBar';
import style from "./style.module.css";

interface UserContainerProps {
  user: UserData;
  watchListData: any[];
  setProfile;
  curStock: string;
  curStockCallback: any;
}

export default function UserContainer({user, watchListData, curStock, curStockCallback, setProfile}: UserContainerProps) {
  return (
    <div id="usercontainer" className="flex flex-col m-0 p-0 w-fit h-screen bg-custom-gray-0">
      <UserInfoBar user={user} setProfile={setProfile} />
      <div className={`overflow-y-scroll overflow-x-hidden ${style.scrollable}`}>
        {
          watchListData && watchListData.map((data, key) => {
              const lastPrice = data.prices[data.prices.length - 1];
              return <WatchlistItem tckr={data.ticker} name={data.name} price={lastPrice} curStockCallback={curStockCallback}
                                    key={key} change={(lastPrice - data.prev_close)/data.prev_close*100} prices={data.prices} curStock={curStock}/>
            }
          )
        }
      </div>
    </div>
  )
}