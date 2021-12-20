# Stock Sonar

Made for HackUTD VIII, Fall 2021.  
Devpost: https://devpost.com/software/stock-sonar

## Inspiration
Retail investor activity is steadily increasing, and they are influencing the market in ways that have not been seen before. These new investors are inspiring others to follow suit on social media. This is an exciting new source of data that can be used to guide investors.

New retail investors don’t often have the information they need to make educated investments. We aim to provide an advanced, cutting-edge tool to help them with stock picking. 


## What it does
Our app is a fully-functional stock aggregator and analyzer that focuses on providing data relevant to the most recent market. Using sentiment analysis, we provide accurate predictions of the current market to our users while allowing them to request data about stocks that fall under their own interest. Using the aggregated data, we provide a 'Top 9' to our users, detailing the top stocks in the media and notifying them of any changes to their own interests.
## How we built it
### Front-end
All front-end components were create from scratch as React components and were styled using TailwindCSS. The front-end is single-page, container-based allowing for an intuitive, simplistic design that provides the user with every feature in our app without the overwhelming layout of most single-page apps. To integrate with Firebase, we used simple HTTP requests to our NextJS API for quick and easy data-fetching across multiple schemas, including user accounts and stock data.
### Back-end
Using data from Twitter and r/wallstreetbets, we analyzed thousands of messages containing keywords on potential stocks that are hot on the market. The stocks are ranked using the frequency at which people are discussing their ticker symbols, as well as the overall polarity of the online discussions. The sentiment was computed using VaderSentiment. For each stock, tweets with high sentiment and following (determined by the number of likes and retweets) were cached for review by users, along with relevant tweets and other financial data regarding the stock. Finally, the front-end consumed this data and displayed it dynamically for users to interact with.
## Challenges we ran into
### Front-end
The main challenges were figuring out our intuitive, simplistic design without overwhelming users with components and visuals. To solve our challenge, we implemented basic vertical scrolling throughout our three main containers to allow for an abundance of visual data, while still allowing the user to have full control over what they would like to see.
### Back-end
In order to determine which stocks are trending we ran a sentiment analysis algorithm on twitter tweets, and used the analysis to rank stocks on how trending they are. We also analyzed posts on the wallstreetbets subreddit to find key information that could be a big influence on stocks.

## Accomplishments that we're proud of
As a whole, this project was outstandingly successful. Every feature that we sought out to build was implemented similar to our designs, and the application works incredibly cohesively to provide users with the best experience possible. The biggest accomplishments we're proud of are the financial and media data displays and sentiment analysis on the front and back-ends, respectively. Each feature is important to the overall impact of the website, and without a doubt took the most effort.
## What we learned
It's hard to build a feature-packed, full-stack web application in less than 24 hours. Each of our members worked tirelessly to achieve this result, and are incredibly thankful to have learned so much about the different technologies and tools used through our experience. Mainly, the front-end focused their learning and exploration on the sophistication of cohesive UI components in React, while the back-end focused on optimal data-fetching and caching for the front-end to display in the UI.
## What's next for StockSonar
Improving sentiment analysis and providing more user-driven and user-specified metrics are our biggest goals for the next iteration of StockSonar.

## Screenshots

Screenshot of main dashboard:  
![image](https://user-images.githubusercontent.com/36653830/146824043-11fccfe8-905d-4057-858d-2bd8a86ab670.png)

Algorithm-selected tweets:  
![image](https://user-images.githubusercontent.com/36653830/146824227-b710efa7-03b0-47b7-b972-38ad74de4cdd.png)
