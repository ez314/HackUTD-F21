import { useEffect, useState } from "react";
import AppFrame from '../AppFrame';
import UserContainer from '../UserContainer';
import MainContainer from '../MainContainer';
import GlobalContainer from '../GlobalContainer';
import Login from '../Login';
import { getUser } from "../../lib/user";

export default function Root({ stocks }) {
  const [user, setUser] = useState(undefined);
  const [curStock, setCurStock] = useState('TSLA');
  const [watchListStocks, setWatchListStocks] = useState(['TSLA']);

  useEffect(() => {
    if (user) return;
    setUser(getUser());
  })
  return (
    <AppFrame>
      <UserContainer user={user/*{
        phone: "(469) 534-2142",
        password: "password",
        name: "test",
      }*/} watchListData={watchListStocks.map(ticker => stocks[ticker])}
      curStock={curStock} setCurStockCallback={setCurStock} />
      <MainContainer data={stocks[curStock]} />
      <GlobalContainer />
      {!user && <Login setUser={setUser}/>}
    </AppFrame>
  )
}