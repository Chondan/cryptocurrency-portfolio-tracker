# Portfolio Tracker

## Functionalities

- user 
	- add crypto to the portfolio ( need to limited supported crypto )
	- input amount of crypto to the portfolio
	- edit amount 
	- delete a crypto from the portfolio
- app 
	- calculate to USD	
		- for each crypto
		- for the whole assets
	- fetch data in an interval basis in 1+x
		- display percentage changed against to previous price

## API

- CoinGecko API -> https://www.coingecko.com/api/documentations/v3
- `coingecko-api` library -> https://www.npmjs.com/package/coingecko-api

### Fetching price 

- Endpoints
	- `/simple/price/`
	- `/coins/list/`

## Components

- Crypto Selecter -> adding to portfolio
- Portfolio
	- List -> change amount, delete
- Card 
	1. Total assets (money in USD)
	2. Percentage changed
