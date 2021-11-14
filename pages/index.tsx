import { useEffect, useState } from 'react';
import AppFrame from '../components/AppFrame';
import UserContainer from '../components/UserContainer';
import MainContainer from '../components/MainContainer';
import GlobalContainer from '../components/GlobalContainer';
import Login from '../components/Login';
import { getUser } from "../lib/user";

export default function Home() {
  const [user, setUser] = useState(undefined);
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
      }*/} subscribedStocks={[]} />
      <MainContainer data={undefined} />
      <GlobalContainer />
      {!user && <Login />}
    </AppFrame>
  )
}
