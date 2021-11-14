export const convertToTimeSeries = (priceArr) => {
  let res = [];
  let timestamp = new Date();

  // initialize timestamp to market open
  timestamp.setHours(8, 30, 0, 0);

  priceArr.forEach(price => {
    res.push({
      timestamp,
      price
    });

    timestamp = new Date(timestamp.getTime() + 5*60*1000);
  });

  return res;
}