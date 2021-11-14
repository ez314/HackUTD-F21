import Stock, { StockData } from '../Stock';
import UserInfoBar from './UserInfoBar';

interface UserContainerProps {
  user: string;
  subscribedStocks: StockData[];
}

export default function UserContainer({ user, subscribedStocks }: UserContainerProps) {
  const stockDisplay = subscribedStocks.map((stock) => {

  })
  return (
    <div id="usercontainer" className="flex flex-col m-0 p-0 w-15p h-screen bg-red-400">
      <UserInfoBar user={user} />
      <div>{user}</div>
      {stockDisplay}
    </div>
  )
}