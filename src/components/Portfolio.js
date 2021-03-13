import { Table } from './';

const Portfolio = ({
	portfolio, currency, handleAmountChange, removeCoin
}) => {
	return (
		<div className="section portfolio-section">
			<Table portfolio={portfolio} currency={currency} 
				handleAmountChange={handleAmountChange} removeCoin={removeCoin}
			/>
		</div>
	);
}

export default Portfolio;