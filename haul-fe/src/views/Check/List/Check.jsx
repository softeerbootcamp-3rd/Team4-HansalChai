import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import InfiniteList from "./components/InfiniteList.jsx";

const Check = () => {
  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          예약 확인
        </Typography>
      </Header>
      <Margin height="32px" />
      <InfiniteList />
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default Check;