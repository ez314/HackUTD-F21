import { useEffect, useState } from "react";
import AppFrame from '../AppFrame';
import UserContainer from '../UserContainer';
import MainContainer from '../MainContainer';
import GlobalContainer from '../GlobalContainer';
import Login from '../Login';
import Profile from "../Profile";
import { getUser, UserData } from "../../lib/user";

export default function Root({ stocks }) {
  const [user, setUser] = useState<UserData>(undefined);
  const [profile, setProfileView] = useState(false);
  const [curStock, setCurStock] = useState('TSLA');
  const [watchListStocks, setWatchListStocks] = useState(['TSLA']);

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
      }*/} setProfile={setProfileView} watchListData={watchListStocks.map(ticker => stocks[ticker])} />
      <MainContainer data={stocks[curStock]} />
      <GlobalContainer />
      {!user && <Login setUser={setUser} />}
      {profile && <Profile setUser={setUser} setProfile={setProfileView} />}
    </AppFrame>
  )
}