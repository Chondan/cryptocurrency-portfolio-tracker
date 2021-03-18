// Make an interval in the basis of 1+x
// round 1: 1 + 0s -> fetch after 1s
// round 2: 1 + 1s -> fetch after 3s
// round 3: 1 + 2s -> fetch after 6s
// round 4: 1 + 3s -> fetch after 10s
// round n: 1 + ns -> fetch after n(n+1)/2
// series = [1, 2, 3, 4, 5, 6,...] 

const getSeriesSum = n => {
	return n * (n + 1) / 2;
}

const getInterval = (callback) => {
	let time = 0;
	let round = 1;
	return setInterval(() => {
		if (time === getSeriesSum(round)) {
			console.log(`fetch round ${round} at time ${time}s`);
			callback(round, time);
			round++;
		}
		time++;
	}, 1000);
}

export { getInterval };