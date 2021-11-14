import { Component } from 'react';
import WatchlistItem from '../WatchlistItem';
import style from "./style.module.css";

interface GlobalContainerProps {
  setSelected;
}

export default function GlobalContainer({ setSelected }: GlobalContainerProps) {
  return (
    <div id="globalcontainer" className="flex flex-row m-0 p-0 w-fit h-screen bg-custom-gray-0">
      <input id={style.watchlistsearch} type="text" placeholder="Search..." className="bg-custom-gray-2 w-48 h-9 m-3 p-4 border-2 rounded-3xl border-custom-gray-2" onKeyPress={(key) => {
        if (key.code === "Enter") {
          setSelected((document.getElementById(style.watchlistsearch) as HTMLInputElement).value);
        }
      }}></input>
    </div>
  )
}