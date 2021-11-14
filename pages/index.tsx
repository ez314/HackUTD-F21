import AppFrame from '../components/AppFrame';
import UserContainer from '../components/UserContainer';
import MainContainer from '../components/MainContainer';
import GlobalContainer from '../components/GlobalContainer';
import React, {useState} from 'react';

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

export default function Home({stocks}) {
  console.debug(stocks);

  const [currentStock, setCurrentStock] = useState('TSLA');

  const currentStockData = stocks[currentStock];

  return (
    <AppFrame>
      <UserContainer user="test" subscribedStocks={[]}/>
      <MainContainer data={currentStockData}/>
      <GlobalContainer/>
    </AppFrame>
  )
}
