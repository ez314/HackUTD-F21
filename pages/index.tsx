import { useEffect, useState } from 'react';
import Root from '../components/Root';
export default function Index({ stocks }) {
  return (
    <Root stocks={stocks}/>
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