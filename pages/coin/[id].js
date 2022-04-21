import React from 'react';
import CoinGecko from 'coingecko-api';
import Image from 'next/image';
import Navbar from '../../Components/Navbar';

const coinGeckoClient = new CoinGecko();

export default function CoinDetails({ coins, coin }) {
    /*
    ath: 69045
    ath_change_percentage: -30.98536
    ath_date: "2021-11-10T14:24:11.849Z"
    atl: 67.81
    atl_change_percentage: 70172.38325
    atl_date: "2013-07-06T00:00:00.000Z"
    circulating_supply: 18998293
    current_price: 47628
    fully_diluted_valuation: 1000671007479
    high_24h: 47793
    id: "bitcoin"
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
    last_updated: "2022-03-30T18:08:14.752Z"
    low_24h: 46751
    market_cap: 905287666510
    market_cap_change_24h: 4683346086
    market_cap_change_percentage_24h: 0.52002
    market_cap_rank: 1
    max_supply: 21000000
    name: "Bitcoin"
    price_change_24h: 118.33
    price_change_percentage_24h: 0.24907
    roi: null
    symbol: "btc"
    total_supply: 21000000
    total_volume: 24215639768
    */
    return (
        <div className="w-full h-screen flex flex-col">
            <Navbar />
            <div className="w-full h-full bg-gray-900 text-white flex flex-row justify-around items-center">
                <div className="flex flex-col flex-start">
                    <p>#{coin[0].market_cap_rank}</p>
                    &nbsp;&nbsp;
                    <div className="h-20 w-20 relative">
                        <Image loader={()=>coin[0].image} src={coin[0].image} layout="fill" alt='Not Found'/>
                    </div>
                    <p>{coin[0].name} ({coin[0].symbol})</p>
                    <p>Circulating Supply {coin[0].circulating_supply}</p>
                    <p>Total Supply ${coin[0].total_supply}</p>
                    <p>Total Volume ${coin[0].total_volume}</p>
                    <p>Market Cap ${coin[0].market_cap}</p>
                    <p>Market Cap Change %24h ${coin[0].market_cap_change_percentage_24h}</p>
                    <p>Market Cap Change USD ${coin[0].market_cap_change_24h}</p>
                    <p>Price Change %24h ${coin[0].price_change_percentage_24h}</p>                
                    <p>Price Change USD ${coin[0].price_change_24h}</p>
                </div>
                <div className="flex flex-col">
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const response = await coinGeckoClient.coins.markets();
    const coins = await coinGeckoClient.coins.markets();
    const coin = await response.data.filter((c) => c.name === id);
    return { props: { coins, coin } }
}