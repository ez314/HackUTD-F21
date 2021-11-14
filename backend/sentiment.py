from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import twint
import nest_asyncio
import json
import time

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize firebase
cred = credentials.Certificate('../firebase.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# sentiment analysis
analyzer = SentimentIntensityAnalyzer()
nest_asyncio.apply()


def get_avatar(username):
    c = twint.Config()
    c.Username = username
    c.Store_object = True
    c.Hide_output = True
    twint.run.Lookup(c)
    return twint.output.users_list[0].avatar


companies = "AXP AMGN AAPL BA CAT CSCO CVX GS HD HON IBM INTC JNJ KO JPM MCD MMM MRK MSFT NKE PG TRV UNH CRM VZ V WBA WMT DIS DOW TSLA AMC GME BBBY CRSR PLTR LCID AMD SPCE NOK BB UBER HOOD NVDA".split()
#companies = "AAPL BA CSCO TSLA GS HD AMC IBM INTC JNJ KO JPM MCD MMM MRK MSFT NKE PG TRV UNH CRM VZ V WBA WMT DIS DOW GME BBBY CRSR PLTR LCID AMD SPCE NOK BB UBER HOOD NVDA".split()
tuple_list = []

startTime = time.time()

# parse companies tweets
for i, ticker in enumerate(companies):
    print(f'Processing {ticker} ({i + 1}/{len(companies)})')
    tickerStartTime = time.time()

    x = twint.Config()
    x.Search = '$' + ticker
    x.Lang = "en"
    x.Since = '2021-10-14'
    x.Until = '2021-11-14'
    x.Limit = 1111
    x.Store_json = True
    x.Hide_output = True
    x.Output = ticker + ".json"
    twint.run.Search(x)
    jsonFile = open(x.Output, encoding="utf8")
    positive = {}
    negative = {}

    # read lines from file
    lines = [line for line in jsonFile]

    # Calculate the scores
    for line in lines:
        if len(positive) + len(negative) >= x.Limit * 0.9:
            break
        jsoned = json.loads(line)
        text = jsoned['tweet']
        if jsoned['language'] == 'und' or jsoned['language'] != 'en':
            continue
        analyzed = analyzer.polarity_scores(text)
        jsoned['analysis'] = analyzed
        if analyzed['pos'] > analyzed['neg']:
            positive[jsoned['link']] = jsoned
        else:
            negative[jsoned['link']] = jsoned

    positive = list(positive.values())
    negative = list(negative.values())

    # Determine the most influential positive and negative tweets
    # First, filter to the more polar tweets
    polar_positive = sorted(positive, key=lambda x: x['analysis']['neg'] - x['analysis']['pos'])[
                     :min(max(3, len(positive) // 2), len(positive))]
    polar_negative = sorted(negative, key=lambda x: x['analysis']['pos'] - x['analysis']['neg'])[
                     :min(max(3, len(negative) // 2), len(negative))]
    best_positive = \
        sorted(polar_positive, key=lambda x: x['retweets_count'] + x['likes_count'], reverse=True)[
        :min(3, len(polar_positive))]
    best_negative = \
        sorted(polar_negative, key=lambda x: x['retweets_count'] + x['likes_count'], reverse=True)[
        :min(3, len(polar_negative))]

    # how trending is sorted
    tuple = (len(positive), len(negative), ticker)
    tuple_list.append(tuple)


    full_data = {
        u'pos_tweet_count': len(positive),
        u'neg_tweet_count': len(negative),
        u'pos_tweets': [{
            'name': x['name'],
            'username': x['username'],
            'content': x['tweet'],
            'profile_pic': get_avatar(x['username']),
            'likes_count': x['likes_count'],
            'retweets_count': x['retweets_count'],
            'link': x['link']
        } for x in best_positive],
        u'neg_tweets': [{
            'name': x['name'],
            'username': x['username'],
            'content': x['tweet'],
            'profile_pic': get_avatar(x['username']),
            'likes_count': x['likes_count'],
            'retweets_count': x['retweets_count'],
            'link': x['link']
        } for x in best_negative],
    }
    print(full_data)

    stock_ref = db.collection(u'stocks').document(ticker)
    stock_ref.set(full_data, merge=True)

    print(
        f'{ticker} took {time.time() - tickerStartTime:.2f} seconds. {time.time() - startTime:.2f} seconds elapsed in total.')

jsonFile.close()

tuple_list.sort()
print(tuple_list)
