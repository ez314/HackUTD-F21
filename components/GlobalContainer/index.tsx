  import { Component } from 'react';
import WatchlistItem from '../WatchlistItem';

interface GlobalContainerProps {
}

export default function GlobalContainer({ }: GlobalContainerProps) {
  return (
    <div id="globalcontainer" className="flex flex-row m-0 p-0 w-15p h-screen bg-custom-gray-0">
      <div>test</div>
      <div>test</div>
      <div>test2</div>
    </div>
  )
}