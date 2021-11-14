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
  const [watchListStocks, setWatchListStocks] = useState(['TSLA']);  
  const [curStock, setCurStock] = useState("TSLA");

  const callback = (tckr) => {
    setCurStock(tckr);
  }

  useEffect(() => {
    if (user) {
      if (watchListStocks.length !== user.watchlist.length) setWatchListStocks(user.watchlist);
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
      <MainContainer data={stocks[curStock]} tckr={curStock} user={user} updateWatchlist={(user: UserData, tckr) => {
        fetch("/api/profile", {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            watchlist: user.watchlist,
          }),
        }).then(async (result) => {
          if (result.status !== 200) {
            return console.log(`Profile update error ${result.status}...`);
          }
          const data = (await result.json()).data;
          const userData: UserData = {
            first_name: data.first_name,
            last_name: data.last_name,
            password: user.password,
            phone: user.phone,
            watchlist: user.watchlist,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(undefined);
        })
        .catch((err) => {
          console.log(err);
        });
      }} />
      <GlobalContainer setSelected={setCurStock} />
      {!user && <Login setUser={setUser} />}
      {profile && <Profile setUser={setUser} setProfile={setProfileView} />}
    </AppFrame>
  )
}