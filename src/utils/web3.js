const Web3 = require('web3');

// Mainnet Pairs
const { supportedCoins, mainnetPairsUSD } = require('./mainnetPairsUSD');

// Setup
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`);
const aggregatorV3InterfaceABI = [
	{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
	{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
	{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},
	{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},
	{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const getPriceFeedPromise = address => {
	const instance = new web3.eth.Contract(aggregatorV3InterfaceABI, address);
	return instance.methods.latestRoundData().call()
}

// PriceFeedPromises
const getPriceFeedPromises = (pairs=mainnetPairsUSD) => {
	const priceFeedPromises = [];
	Object.keys(pairs).forEach((key, index) => {
		const promise = getPriceFeedPromise(pairs[key]);
		priceFeedPromises.push({ coinName: supportedCoins[index], priceFeedPromise: promise });
	});
	return priceFeedPromises;
}

// Transfrom prices data to the shape of { xxx: { usd: xxxx } }
const transformPricesShape = (prices) => {
	const transformedPrices = {};
	prices.forEach(price => {
		const { coinName, usd } = price;
		transformedPrices[coinName] = { usd };
	});
	return transformedPrices;
}

const fetchingPrices = async () => {
	const priceFeedPromises = getPriceFeedPromises(mainnetPairsUSD);
	const prices = await Promise.all(
		priceFeedPromises.map(async ({ coinName, priceFeedPromise }) => {
			const { answer: price } = await priceFeedPromise;
			return { coinName, usd: price / 1e8 }; // convert to 8 decimal points
		})
	)
	return transformPricesShape(prices);
}

export default fetchingPrices;