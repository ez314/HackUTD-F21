import WatchlistGraph from "./WatchlistGraph";
import { useEffect, useState } from "react";

interface WatchlistItemProps {
  tckr: string;
  name: string;
  price: number;
  change: number;
  prices: number[];
  selected: boolean;
  setCurStockCallback: any;
}

function watchlistClick() {

}


export default function WatchlistItem({tckr, name, price, change, prices, selected, setCurStockCallback}: WatchlistItemProps) {

  const percIncr = change > 0.00 ?
    (<p className="rounded-lg bg-custom-green px-2 text-custom-gray-4">+{change.toFixed(2)}%</p>) :
    (<p className="rounded-lg bg-custom-red px-2 text-custom-gray-4">{change.toFixed(2)}%</p>);

  return (
    <div className="p-6 m-0 min-w-full mx-auto bg-gray-1 text-custom-gray-4 flex
    items-center shadow-cool cursor-pointer" onClick={setCurStockCallback({tckr})}>
      <div className="w-5/12 text-left">
        <div className="text-lg font-medium">{tckr}</div>
        <div className="text-sm">{name}</div>
      </div>
      <div className="w-4/12 mx-2">
        <WatchlistGraph change={change} prices={prices} tckr={tckr}/>
      </div>
      <div>
        <p className="flex-none text-right">{"$" + price.toFixed(2)}</p>
        {percIncr}
      </div>
    </div>
  )

}