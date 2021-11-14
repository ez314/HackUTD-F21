from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import os
import requests
import json

with open('backend/passwords.json', 'r') as f:
    pw_json = f.read()
pw_json = json.loads(pw_json)
#credentials some hid by passwords.json which is git ignored
CLIENT_ID = '2c3iaMbehBZS72RSleV3Aw'
SECRET_KEY = pw_json["secret"]
PW = pw_json["password"] 
auth = requests.auth.HTTPBasicAuth(CLIENT_ID,SECRET_KEY)

#log in get reddit accesstoken, and put that into the header variable
data = {
    'grant_type':'password',
    'username':'RareMaterial7218',

    'password':f'{PW}'
}
headers = {'User-Agent': "APP/0.0.1"}
res = requests.post('https://www.reddit.com/api/v1/access_token',auth=auth,data=data,headers=headers)
TOKEN = res.json()['access_token']
headers['Authorization'] = f'bearer {TOKEN}'

stock = ['AXP', 'AMGN', 'AAPL', 'BA' ,'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'INTC', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'CRM', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW', 'TSLA','AMC', 'GME', 'BBBY', 'CRSR' ,'PLTR', 'LCID', 'AMD', 'SPCE', 'NOK', 'BB', 'UBER', 'HOOD', 'NVDA']

res_2 = requests.get('https://oauth.reddit.com/r/wallstreetbets/top/?t=month', headers=headers)

#jsonObj = json.dumps(res_2.json())
# Avatar, Username, title ,Stock, Score, Link 
#with open('output.json','w') as f:
 #   f.write(jsonObj)
#text analyzer
analyzer = SentimentIntensityAnalyzer()
stock_tuples = []
i=0
for post in res_2.json()['data']['children']:
    permalink = res_2.json()['data']['children'][i]['data']['permalink']
    i+=1
    for s in stock:
       title = post['data']['title']
       if(title.find(f'{s}') !=-1):
           analyzed = analyzer.polarity_scores(title)
           temp = (permalink,title,s,analyzed['pos'] - analyzed['neg'])
           stock_tuples.append(temp)
           diff = (analyzed['pos'] - analyzed['neg'])
           print(title +": "+f'{diff}')



    
