import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

const fetchingPrice = async (ids=["bitcoin", "ethereum"], vs_currencies=["usd"]) => {
	const data = await CoinGeckoClient.simple.price({ ids, vs_currencies });
	return data;
}

export { fetchingPrice };