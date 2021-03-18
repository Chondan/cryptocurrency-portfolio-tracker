import { useState } from 'react';

// Components
import { Dropdown } from './';

const Selector = ({
	options, onListClick, portfolio
}) => {

	const [searchValue, setSearchValue] = useState('');

	const handleInputChange = (e) => {
		setSearchValue(e.target.value);
	}

	return (
		<div className="section selector-section">
			<Dropdown 
				options={options.filter(option => option.toLowerCase().search(searchValue.toLowerCase()) !== -1).filter(option => !portfolio.some(p => p.name === option))} 
				value={searchValue} handleInputChange={handleInputChange} 
				onListClick={onListClick} portfolio={portfolio}
			/>
		</div>
	);
}

export default Selector;