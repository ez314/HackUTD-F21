import { useEffect, useState } from 'react';
import AppFrame from '../components/AppFrame';
import UserContainer from '../components/UserContainer';
import MainContainer from '../components/MainContainer';
import GlobalContainer from '../components/GlobalContainer';
import Login from '../components/Login';
import { getUser } from "../lib/user";
export default function Home({ stocks }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    if (user) return;
    setUser(getUser());
  })
   console.log(stocks);
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
export async function getServerSideProps() {
  const {db} = require('../util/Firebase');
  const stocksRef = db.collection('stocks');
  const snapshot = await stocksRef.get();

  let stocks = {}
  snapshot.forEach(doc => {
    stocks[doc.id] = doc.data();
  });

  return {
    props: {stocks}
  }
}