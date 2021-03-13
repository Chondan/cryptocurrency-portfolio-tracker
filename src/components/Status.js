import { useState, useEffect, useCallback } from 'react';

// Components
import { Card } from './';

// Utils
import { currencySymbols } from '../utils/currency';

// Redux
import { useSelector } from 'react-redux';

const Status = ({
	portfolio, currency
}) => {

	const [currentValue, setCurrentValue] = useState(0);
	const [percentageChange, setPercentageChange] = useState(0);
	const prices = useSelector(state => state.price);

	const getTotalValue = useCallback(() => {
		let value = 0;
		portfolio.forEach(coin => {
			const { name, amount } = coin;
			const price = prices[name][currency];
			value += amount * price;	
		});
		return value;
	}, [prices, currency, portfolio]);

	const getPercentageChange = (prev, cur) => {
		if (+prev === 0) return 0;

		const percentageChange = (cur - prev) / prev * 100;
		return percentageChange;
	}

	useEffect(() => {
		if (!prices) return;

		const prev = currentValue;
		const cur = getTotalValue();
		if (cur !== prev) {
			setPercentageChange(getPercentageChange(prev, cur));
		}
		setCurrentValue(cur);

	}, [currentValue, getTotalValue, prices]);

	return (
		<div className="section status-section">
			<Card title="Total Value">
				{currencySymbols[currency]}{currentValue.toFixed(2)}
			</Card>
			<Card title="Change">
				<div style={{ color: percentageChange >= 0 ? 'green' : 'red' }}>
					{percentageChange > 0 ? `+${percentageChange.toFixed(2)}%` : `${percentageChange.toFixed(2)}%`}
				</div>
			</Card>
		</div>
	);
}

export default Status;