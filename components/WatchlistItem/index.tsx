import WatchlistGraph from "./WatchlistGraph";

interface WatchlistItemProps {
  tckr: string,
  name: string,
  price: number,
  change: number,
  prices: number[],
  curStock: string,
  curStockCallback: any
}


export default function WatchlistItem({tckr, name, price, change, prices, curStock, curStockCallback}: WatchlistItemProps) {
  const selected = curStock === tckr;

  const percIncr = change > 0.00 ?
    (<p className="rounded-lg bg-custom-green px-2 text-custom-gray-4">+{change.toFixed(2)}%</p>) :
    (<p className="rounded-lg bg-custom-red px-2 text-custom-gray-4">{change.toFixed(2)}%</p>);

  return (
    <div className={`p-6 m-0 min-w-full mx-auto text-custom-gray-4 flex 
    items-center shadow-cool cursor-pointer hover:bg-custom-gray-2 transition ${selected ? "bg-custom-gray-2" : "bg-custom-gray-1"}`} onClick={() => curStockCallback(tckr)}>
      <div className="w-4/12 flex-none text-left">
        <div className="text-lg font-medium">{tckr.toString()}</div>
        <div className="text-sm max-w-1 truncate">{name}</div>
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