import ThumbDownIcon from "../../icon/ThumbDownIcon"
import ThumbUpIcon from "../../icon/ThumbUpIcon"

interface GlobalElemProps {
    tckr: string;
    name: string;
    sentiment: number;
    idx: number;
    curStockCallback: any;
}


export default function GlobalElem({tckr, name, sentiment, idx, curStockCallback} : GlobalElemProps) {
    let color;
    switch (idx) {
        case 0: color="bg-custom-gold text-custom-gray-0"; break;
        case 1: color="bg-custom-silver text-custom-gray-0"; break;
        case 2: color="bg-custom-bronze text-custom-gray-0 "; break;
        default: color="bg-custom-gray-3 text-custom-gray-4";
    }
    return (
        <div className="px-6 py-4 m-0 min-w-full mx-auto bg-custom-gray-1 flex 
        items-center shadow-cool cursor-pointer hover:bg-custom-gray-2 transition" onClick={() => curStockCallback(tckr)}>
            <div className={"w-3/6 px-2 rounded-md  text-center mr-4 font-bold " + color}>
                {idx+1}
            </div>
            <div className="w-3/6 flex-none text-left">
                <div className="text-lg font-medium">{tckr}</div>
                <div className="text-sm max-w-1 truncate">{name}</div>
            </div>
            <div className="w-1/6 mx-2">{sentiment > 0 ? <ThumbUpIcon className="w-6 h-6"/> : <ThumbDownIcon className="w-6 h-6"/> }</div>
        </div>
    )
}