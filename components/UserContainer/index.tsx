import Stock, { StockData } from '../Stock';
import { UserData } from "../../lib/user";
import UserInfoBar from './UserInfoBar';

interface UserContainerProps {
  user: UserData;
  subscribedStocks: StockData[];
}

export default function UserContainer({ user, subscribedStocks }: UserContainerProps) {
  const stockDisplay = subscribedStocks.map((stock) => {

  })
  return (
    <div id="usercontainer" className="flex flex-col m-0 p-0 w-15p h-screen bg-custom-gray-0">
      <UserInfoBar user={user} />
      <div>{user && user.name}</div>
      {stockDisplay}
    </div>
  )
}