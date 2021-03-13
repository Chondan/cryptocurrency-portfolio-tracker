import _ from 'lodash';
import { useState, useEffect } from 'react';
import './App.css';

// Components 
import { Status, Selector, Portfolio } from './components';

// Utils 
import { supportedCoins } from './utils/coin';

// Redux
import { useDispatch } from 'react-redux';
import { fetchPrice } from './redux/slices/priceSlice';

function App() {

  const [portfolio, setPortfolio] = useState([]);
  const [currency, setCurrency] = useState('usd'); // open for extend
  const dispatch = useDispatch();

  // ----- COIN -----
  const addCoin = (coin, initialAmount=0) => {
    if (portfolio.some(p => p.name === coin)) return;

    setPortfolio(port => {
      return [ ...port, { name: coin, amount: initialAmount } ];
    })
  }

  const removeCoin = (coin) => {
    const copyPortfolio = _.cloneDeep(portfolio);
    const updatedPortfolio = copyPortfolio.filter(p => p.name !== coin);

    setPortfolio(updatedPortfolio);
  }

  const handleAmountChange = (coin, amount) => {
    // if (+amount === 0) return removeCoin(coin);
    const copyPortfolio = _.cloneDeep(portfolio);
    const updatedCoin = copyPortfolio.find(p => p.name === coin);
    updatedCoin.amount = amount;

    setPortfolio(copyPortfolio);
  }
  // ----- COIN -----

  useEffect(() => {

    dispatch(fetchPrice()); // fetching first round

    const updatePrice = setInterval(async () => {
     dispatch(fetchPrice());
    },  1000); // fetches data in an interval basis in 1+x

    return () => clearInterval(updatePrice); // Clean up
  }, [dispatch]);

  return (
    <div className="App">
       <h1 className="app-name">Portfolio Tracker</h1>
       <div className="layout">
         <Status portfolio={portfolio} currency={currency} />
         <Selector options={supportedCoins} onListClick={addCoin} portfolio={portfolio} />
         <Portfolio portfolio={portfolio} currency={currency} 
           handleAmountChange={handleAmountChange} removeCoin={removeCoin}
         />
       </div>
    </div>
  );
}

export default App;
