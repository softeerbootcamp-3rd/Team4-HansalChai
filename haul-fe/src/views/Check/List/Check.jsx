import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import InfiniteList from "./components/InfiniteList.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import TabBar from "./components/TabBar.jsx";
import { useState } from "react";

//TODO: API가 운송상태를 구별하여 가져올 수 있게 변경된 후 리스트 수정할 것!
const Check = () => {
  const [selectedStatus, setSelectedStatus] = useState(0);

  const statusList = ["운송 전", "운송 중", "운송 완료"];

  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          예약 확인
        </Typography>
      </Header>
      <Margin height="32px" />
      <TabBar
        tabBarList={statusList}
        setSelected={setSelectedStatus}
        selected={selectedStatus}
      />
      <UnderBar />
      <Margin height="20px" />
      <InfiniteList />
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default Check;
