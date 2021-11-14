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
    (<p className="rounded-lg bg-custom-green px-2 text-custom-gray-4">+{change.toFixed(2)}%</p>) :
    (<p className="rounded-lg bg-custom-red px-2 text-custom-gray-4">{change.toFixed(2)}%</p>);

  return (
    <div className="p-6 m-0 min-w-full mx-auto bg-custom-gray-1 text-custom-gray-4 flex items-center shadow-cool cursor-pointer hover:bg-custom-gray-2 transition">
      <div className="flex-none text-left">
        <div className="text-lg font-medium">{tckr}</div>
        <div className="text-sm">{name}</div>
      </div>
      <div className="flex-1 mx-3">
        <WatchlistGraph change={change} prices={prices} tckr={tckr}/>
      </div>
      <div>
        <p className="flex-none text-right mx-2">{price.toFixed(2)}</p>
        {percIncr}
      </div>
    </div>
  )

}