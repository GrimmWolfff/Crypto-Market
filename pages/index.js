
//* Create Repository
//* git clone repository
//* git add .
//? git commit -m "first commit"
//* git push -u origin main

import React from 'react'
import Coin from '../Components/Coin';
import CoinGecko from 'coingecko-api';
import Navbar from '../Components/Navbar';

const coinGeckoClient = new CoinGecko();

export default function Index({ coins }) {
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.data.filter((Coin) => Coin.name.toLowerCase().includes(search.toLowerCase()) );
  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="flex flex-col justify-around items-center bg-gray-900 w-full m-0 p-0 h-auto text-white">
        <Navbar />
        <input className="text-black rounded-lg border-none h-4 p-6 m-4 w-1/2"
        placeholder="Search for cryptocurrencies" onChange={e => handleChange(e)} />
        <div className="flex flex-row justify-evenly items-center w-full h-10 mb-4 p-2 shadow border-bottom border-gray-300">
            <div className="w-1/6">Name</div>
            <div className="w-1/6">%24h</div>
            <div className="w-1/6">Market Cap</div>
            <div className="w-1/6">Price (USD)</div>
            <div className="w-1/6">Circulating Supply</div>
        </div>
        {
          filteredCoins.map((coin, idx) => (
            <Coin 
              key={idx}
              id={coin.market_cap_rank} 
              name={coin.name} 
              price={coin.current_price}
              circulating={coin.circulating_supply}
              marketCap={coin.market_cap}
              img={coin.image}
              change24h={coin.price_change_percentage_24h}
            />
          ))
        }
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const params = { order: CoinGecko.ORDER.MARKET_CAP_DESC };
  const coins = await coinGeckoClient.coins.markets({params});
  return { props: { coins } }
}