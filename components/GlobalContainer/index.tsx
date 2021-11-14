import { Component } from 'react';
import GlobalHeader from './GlobalHeader';
import GlobalElem from './GlobalElem';
import style from "./style.module.css";

interface GlobalContainerProps {
  curStockCallback: any;
}

export default function GlobalContainer({curStockCallback}: GlobalContainerProps) {
  return (
    <div id="globalcontainer" className="flex flex-col m-0 p-0 w-25p h-screen bg-custom-gray-0">
      <input id={style.watchlistsearch} type="text" placeholder="Search..." className="bg-custom-gray-2 w-48 h-9 m-3 p-4 border-2 rounded-3xl border-custom-gray-2" onKeyPress={(key) => {
        if (key.code === "Enter") {
          setSelected((document.getElementById(style.watchlistsearch) as HTMLInputElement).value);
        }
      }}></input>
      <div className={`overflow-y-scroll overflow-x-hidden ${style.scrollable}`}>
        <GlobalElem tckr={"TSLA"} name={"Tesla"} sentiment={1} idx={0} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"MSFT"} name={"Tesla"} sentiment={1} idx={1} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"UBER"} name={"Tesla"} sentiment={1} idx={2} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"JNJ"} name={"Tesla"} sentiment={1} idx={3} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"NVDA"} name={"Tesla"} sentiment={1} idx={4} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"INTC"} name={"Tesla"} sentiment={1} idx={5} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"LCID"} name={"Tesla"} sentiment={1} idx={6} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"PLTR"} name={"Tesla"} sentiment={1} idx={7} curStockCallback={curStockCallback}/>
        <GlobalElem tckr={"AAPL"} name={"Tesla"} sentiment={1} idx={8} curStockCallback={curStockCallback}/>
      </div>
    </div>
  )
}