import WatchlistItem from '../WatchlistItem';
import { UserData } from "../../lib/user";
import UserInfoBar from './UserInfoBar';

interface UserContainerProps {
  user: UserData;
  subscribedStocks: [];
}

export default function UserContainer({ user, subscribedStocks }: UserContainerProps) {
  const stockDisplay = subscribedStocks.map((stock) => {

  })
  return (
    <div id="usercontainer" className="flex flex-col m-0 p-0 w-15p h-screen bg-red-400">
      <UserInfoBar user={user} />
      <div className="overflow-y-scroll overflow-x-hidden">
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
        <WatchlistItem tckr={"AAPL"} name={"Apple, Inc"} price={35.66} change={2.19} prices={[1,3,2,4,5,1]}/>
      </div>
    </div>
  )
}