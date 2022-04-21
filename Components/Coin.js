import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Coin({ id, name, price, img, change24h, marketCap, circulating }) {
    const router = useRouter();
    return (
        <div className="flex flex-row justify-evenly items-center w-full h-10 pb-10 pt-10
        shadow border-bottom border-gray-900 ease-in-out cursor-pointer duration-100 hover:bg-gray-800"
        onClick={() => router.push(`/coin/${name}`)}>
            <p>{id}</p>
            <div className="h-8 w-8 relative">
                <Image src={img} alt="Image" layout="fill" className="h-8 w-8 rounded-full"/>
            </div>
            <div className="w-1/6 cursor-pointer hover:underline">{name}</div>
            <div className="w-1/6">{change24h}%</div>
            <div className="w-1/6">${marketCap}</div>
            <div className="w-1/6">${price}</div>
            <div className="w-1/6">{circulating}</div>
        </div>
    );
}