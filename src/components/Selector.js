import { useState } from 'react';

// Components
import { Dropdown } from './';

// Redux 
import { useSelector } from 'react-redux';

const Selector = ({
	options, onListClick, portfolio
}) => {

	const prices = useSelector(state => state.price);
	const [searchValue, setSearchValue] = useState('');

	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	}

	return (
		<div className="section selector-section">
			{
				prices ?
				<Dropdown 
					options={options.filter(option => option.toLowerCase().search(searchValue.toLowerCase()) !== -1).filter(option => !portfolio.some(p => p.name === option))} 
					value={searchValue} handleInputChange={handleInputChange} 
					onListClick={onListClick} portfolio={portfolio}
				/> :
				<div className="loading-status">Loading...</div>
			}
		</div>
	);
}

export default Selector;