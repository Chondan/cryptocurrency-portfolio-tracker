import { useState } from 'react';

const List = ({
	hide, options, onListClick
}) => {

	return (
		<div className="dropdown-list" style={{ display: hide ? "none" : "block" }}>
			{
				options.map(option => (
					<div className="list" key={option}
						onClick={() => {
							onListClick(option);
						}}
					>
						{option}
					</div>
				))
			}
		</div>
	);
}

const Dropdown = ({
	options, handleInputChange, value, onListClick
}) => {

	const [hideList, setHideList] = useState(true);

	const handleOnFocus = () => setHideList(false);
	const handleOnBlur = () => setTimeout(() => setHideList(true), 250);

	return (
		<div className="dropdown">
			<input type="text" value={value} 
				onFocus={handleOnFocus} onBlur={handleOnBlur} 
				onChange={handleInputChange} placeholder="Add a coin to track its price..."
			/>
			<List hide={hideList} options={options} onListClick={onListClick} />
		</div>
	);
}

export default Dropdown;