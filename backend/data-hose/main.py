import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import yfinance as yf
import json

# Initialize firebase
cred = credentials.Certificate('../../firebase.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Define tickers
tickers = ("AXP AMGN AAPL BA CAT CSCO CVX GS HD HON IBM INTC JNJ KO JPM MCD MMM MRK MSFT NKE PG TRV UNH CRM VZ V WBA WMT DIS DOW " +
           "TSLA AMC GME BBBY CRSR PLTR LCID AMD SPCE NOK BB UBER HOOD NVDA")

# Download data
df = yf.download(
    tickers=tickers,
    group_by='Ticker',
    period="5d",
    interval="5m",
)

# Filter to Friday, Thursday Close
df_friday = df.loc['2021-11-12':'2021-11-12']
df_thurs = df.loc['2021-11-11':'2021-11-11']


# Restructure to ticker->df
d_friday = {idx: gp.xs(idx, level=0, axis=1) for idx, gp in df_friday.groupby(level=0, axis=1)}
d_thurs = {idx: gp.xs(idx, level=0, axis=1) for idx, gp in df_thurs.groupby(level=0, axis=1)}

# Process per ticker, write to firestore
for ticker in tickers.split():
    print(f'Processing {ticker}')
    # Process prices and volume from our time series data
    data_as_list = d_friday[ticker].values.tolist()
    json.dump(data_as_list, open(f'{ticker}.json', 'w'))

    prices = [x[4] for x in data_as_list][:62]
    vols = [x[5] for x in data_as_list][:62]

    prev_close = d_thurs[ticker].values.tolist()[-1][4]

    # Process general company info
    stockinfo = yf.Ticker(ticker).info
    json.dump(stockinfo, open(f'{ticker}-info.json', 'w'))

    stock_ref = db.collection(u'stocks').document(ticker)
    stock_ref.set({
        u'ticker': ticker,
        u'prices': prices,
        u'vols': vols,
        u'prev_close': prev_close,
        u'name': stockinfo['shortName'],
        u'sector': stockinfo['sector'],
        u'short_percent_of_float': stockinfo['shortPercentOfFloat'],
        u'short_ratio': stockinfo['shortRatio'],
        u'market_cap': stockinfo['marketCap'],
        u'dividend_rate': stockinfo['dividendRate'],
        u'logo_url': stockinfo['logo_url'],
        u'52_wk_high': stockinfo['fiftyTwoWeekHigh'],
        u'52_wk_low': stockinfo['fiftyTwoWeekLow'],
        u'day_low': min(prices),
        u'day_high': max(prices),
        u'day_vol': sum(vols),
    }, merge=True)
