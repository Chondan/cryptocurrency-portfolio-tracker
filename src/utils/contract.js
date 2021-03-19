const contractAddresses = require(`./contractsJSON/${process.env.REACT_APP_NETWORK}.json`);
const { nameOf } = require('crypto-symbol');

// Filter 'XXX / USD'
const getContracts = data => {
	const contracts = {};
	for (const key of Object.keys(data)) {
		const [a, b] = key.split(' / ');
		if (!b) continue;
		if (b === 'USD') {
			const coinName = nameOf(a);
			if (coinName !== undefined) {
				contracts[coinName] = data[key];
			}
		}
	}
	return contracts;
}
const contracts = getContracts(contractAddresses);
const supportedCoins = Object.keys(contracts);

export { contracts, supportedCoins };