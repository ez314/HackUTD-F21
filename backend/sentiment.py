from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import twint
import nest_asyncio
import json
import heapq

analyzer = SentimentIntensityAnalyzer()
#twint stuff. Twitter scraper.
nest_asyncio.apply()
companies = ["Walmart", "Amazon", "Apple", "CVS Health", "UnitedHealth Group", "Berkshire Hathaway", "McKesson", "AmerisourceBergen","Alphabet","Exxon Mobil"]

for i in companies:
    x = twint.Config()
    x.Search = i
    x.Lang = "en"
    x.Since='2021-10-14'
    x.Until='2021-11-14'
    x.Limit=2000
    x.Store_json = True
    x.Output = i+".json"
    twint.run.Search(x)
    a= open(x.Output, encoding = "utf8")
    positive = 0
    negative = 0
    for line in a:
        jsoned = json.loads(line)
        text = jsoned['tweet']
        if(jsoned['language'] == 'und' or jsoned['language'] != 'en'):
            continue
        analyzed = analyzer.polarity_scores(text)
        if not analyzed['neg'] > 0.1:
            positive+=1
        else: 
            negative+=1
        
a.close()