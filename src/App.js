import _ from 'lodash';
import { Fragment, useState, useEffect } from 'react';
import './App.css';

// Components 
import { Status, Selector, Portfolio } from './components';

// Utils 
import { supportedCoins } from './utils/contract';
import { getInterval } from './utils/interval';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrice } from './redux/slices/priceSlice';

function App() {

  const [portfolio, setPortfolio] = useState([]);
  // const [currency, setCurrency] = useState('usd'); // open for extend
  const currency = 'usd';
  const dispatch = useDispatch();
  const prices = useSelector(state => state.price);

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
         { prices ? 
           <Fragment>
             <Selector options={supportedCoins} onListClick={addCoin} portfolio={portfolio} />
             <Portfolio portfolio={portfolio} currency={currency} 
               handleAmountChange={handleAmountChange} removeCoin={removeCoin}
             />
           </Fragment> :
           <div className="loading-status">Loading</div>
         }
         
         
       </div>
    </div>
  );
}

export default App;
