const mainnet = require('./mainnetPairs.json');
const { nameOf } = require('crypto-symbol');

// Filter 'XXX / USD'
const mainnetPairsUSD = {};
const supportedCoins = [];
for (const key of Object.keys(mainnet)) {
	const [a, b] = key.split(' / ');
	if (!b) continue;
	if (b === 'USD') {
		const coinName = nameOf(a);
		if (coinName !== undefined) {
			mainnetPairsUSD[coinName] = mainnet[key];
			supportedCoins.push(coinName);
		}
	}
}
// console.log(mainnetPairsUSD);

export { mainnetPairsUSD, supportedCoins };