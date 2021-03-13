import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useSelector } from 'react-redux';

const headers = [
	"No.",
	"Name",
	"Amount",
	"Value",
	"Remove"
]

const TableHead = ({
	headers
}) => {
	return (
		<thead>
			<tr>
				{
					headers.map(header => (
						<th key={header}>{header}</th>
					))
				}
			</tr>
		</thead>
	);
}

const Row = ({
	coin, portfolio, currency, handleAmountChange, removeCoin
}) => {

	const prices = useSelector(state => state.price);
	const { name, amount: a, index } = coin;
	const [amount, setAmount] = useState(a);
	const [isEditing, setIsEditing] = useState(false);

	const handleInputAmountChange = (e) => {
		setAmount(e.target.value);
	}

	const handleEditAmount = () => {
		if (isEditing) handleAmountChange(name, amount);
		setIsEditing(x => !x);
	}

	return (
		<tr key={name}>
			<td>{index + 1}</td>
			<td className="coin-name">{name}</td>
			<td className="coin-input">
				<input type="number" value={amount} min={0} step="any"
					onChange={handleInputAmountChange} disabled={!isEditing}
				/> 
				<button onClick={handleEditAmount}>
					{isEditing ? "Save" : "Edit"}
				</button>
			</td>
			<td className="coin-price">
				{(prices[name][currency] * amount).toFixed(2) + ' ' + currency.toUpperCase()}
			</td>
			<td title="remove from portfolio" className="remove-btn" onClick={() => removeCoin(name)}>remove</td>
		</tr>
	);
}

const TableBody = ({
	portfolio, currency, handleAmountChange, removeCoin
}) => {
	return (
		<tbody>
			{
				portfolio.map((coin, index) => (
					<Row 
						key={uuidv4()}
						coin={{ ...coin, index }}
						portfolio={portfolio}
						currency={currency}
						handleAmountChange={handleAmountChange}
						removeCoin={removeCoin}
					/>
				))
			}
		</tbody>
	);
}

const Table = ({
	portfolio, currency, handleAmountChange, removeCoin
}) => {

	return (
		<div className="table">
			<table>
				<TableHead headers={headers} />
				<TableBody portfolio={portfolio} currency={currency} 
					handleAmountChange={handleAmountChange} removeCoin={removeCoin}
				/>
			</table>
		</div>
	);
}

export default Table;