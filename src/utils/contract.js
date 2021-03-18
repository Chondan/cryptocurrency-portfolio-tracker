const contractAddresses = require('./contracts.json');
const { nameOf } = require('crypto-symbol');

// Filter 'XXX / USD'
const contracts = {};
const supportedCoins = [];
for (const key of Object.keys(contractAddresses)) {
	const [a, b] = key.split(' / ');
	if (!b) continue;
	if (b === 'USD') {
		const coinName = nameOf(a);
		if (coinName !== undefined) {
			contracts[coinName] = contractAddresses[key];
			supportedCoins.push(coinName);
		}
	}
}
// console.log(contracts);

export { contracts, supportedCoins };