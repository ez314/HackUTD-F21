import { useEffect, useState } from "react";
import AppFrame from '../AppFrame';
import UserContainer from '../UserContainer';
import MainContainer from '../MainContainer';
import GlobalContainer from '../GlobalContainer';
import Login from '../Login';
import Profile from "../Profile";
import { getUser, UserData } from "../../lib/user";

export default function Root({ stocks }) {
  const stockList = ['TSLA', 'GOOG', 'AAPL', 'MSFT', 'UBER', 'PLTR', 'NVDA', 'LCID', 'HOOD', 'JNJ', 'INTC', 'GME'].sort();
  const [user, setUser] = useState<UserData>(undefined);
  const [profile, setProfileView] = useState(false);
  const [watchListStocks, setWatchListStocks] = useState(stockList);  
  const [curStock, setCurStock] = useState(stockList[0]);

  const callback = (tckr) => {
    setCurStock(tckr);
  }

  useEffect(() => {
    if (user) {
      if (!profile && (!user.first_name || !user.last_name)) setProfileView(true);
      return;
    }
    setUser(getUser());
  })
  return (
    <AppFrame>
      <UserContainer user={user/*{
        phone: "(469) 534-2142",
        password: "password",
        name: "test",
      }*/} watchListData={watchListStocks.map(ticker => stocks[ticker])} curStock={curStock} curStockCallback={callback} setProfile={setProfileView}/>
      <MainContainer data={stocks[curStock]} />
      <GlobalContainer curStockCallback={callback}/>
      {!user && <Login setUser={setUser} />}
      {profile && <Profile setUser={setUser} setProfile={setProfileView} />}
    </AppFrame>
  )
}