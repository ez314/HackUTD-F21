import { useEffect, useState } from "react";
import AppFrame from '../AppFrame';
import UserContainer from '../UserContainer';
import MainContainer from '../MainContainer';
import GlobalContainer from '../GlobalContainer';
import Login from '../Login';
import { getUser } from "../../lib/user";

export interface RootProps {

}

export default function Root({ }: RootProps) {
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
      {!user && <Login setUser={setUser}/>}
    </AppFrame>
  )
}