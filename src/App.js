import _ from 'lodash';
import { useState, useEffect } from 'react';
import './App.css';

// Components 
import { Status, Selector, Portfolio } from './components';

// Utils 
// import { supportedCoins } from './utils/coin';
import { supportedCoins } from './utils/mainnetPairsUSD';
import { getInterval } from './utils/interval';

// Redux
import { useDispatch } from 'react-redux';
import { fetchPrice } from './redux/slices/priceSlice';

function App() {

  const [portfolio, setPortfolio] = useState([]);
  // const [currency, setCurrency] = useState('usd'); // open for extend
  const currency = 'usd';
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

    const updatePrice = getInterval(() => {
      dispatch(fetchPrice());
    });

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
