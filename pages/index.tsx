import AppFrame from '../components/AppFrame';
import UserContainer from '../components/UserContainer';
import MainContainer from '../components/MainContainer';
import GlobalContainer from '../components/GlobalContainer';

export default function Home() {
  return (
    <AppFrame>
      <UserContainer user="test" subscribedStocks={[]} />
      <MainContainer data={undefined} />
      <GlobalContainer />
    </AppFrame>
  )
}
