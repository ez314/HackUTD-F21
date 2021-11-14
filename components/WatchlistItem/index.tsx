import WatchlistGraph from "./WatchlistGraph";

interface WatchlistItemProps {
  tckr: string,
  name: string,
  price: number,
  change: number,
  prices: number[]
}


export default function WatchlistItem({tckr, name, price, change, prices }: WatchlistItemProps) {

  const percIncr = change > 0.00 ?
    (<p className="rounded-lg bg-green-400 px-2 text-white">+{change.toFixed(2)}%</p>) :
    (<p className="rounded-lg bg-red-400 px-2 text-white">{change.toFixed(2)}%</p>);

  return (
    <button className="p-6 m-0 min-w-full mx-auto bg-white flex items-center shadow-inner">
      <div className="flex-none text-left">
        <div className="text-xl font-medium text-black">{tckr}</div>
        <div className="text-sm">{name}</div>
      </div>
      <div className="flex-1 mx-3">
        <WatchlistGraph change={change} prices={prices} tckr={tckr}/>
      </div>
      <div>
        <p className="flex-none text-right mx-2">{price.toFixed(2)}</p>
        {percIncr}
      </div>
    </button>
  )

}