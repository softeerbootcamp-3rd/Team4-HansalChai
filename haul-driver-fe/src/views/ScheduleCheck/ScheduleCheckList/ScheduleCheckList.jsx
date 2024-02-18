import { useState } from "react";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import InfiniteList from "../../../components/InfiniteList/InfiniteList.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import TabBar from "../../../components/TabBar/TabBar.jsx";
import { getDriverSummaryList } from "../../../repository/checkRepository.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import { functionBinder } from "../../../utils/helper.js";
import Typography from "../../../components/Typhography/Typhography.jsx";

//TODO: API가 운송상태를 구별하여 가져올 수 있게 변경된 후 리스트 수정할 것!
const ScheduleCheckList = () => {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const driverName = "시현";
  const statusList = ["운송 전", "운송 중", "운송 완료"];
  const fetcherList = [
    functionBinder(getDriverSummaryList, { keyword: "운송 전" }),
    functionBinder(getDriverSummaryList, { keyword: "운송 중" }),
    functionBinder(getDriverSummaryList, { keyword: "운송 완료" })
  ];

  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font="bold24">
          <TypographySpan color="subColor">{driverName}기사</TypographySpan>님의
          일정<TypographySpan color="subColor"> .</TypographySpan>
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
      <InfiniteList
        fetcher={fetcherList}
        listStatus={selectedStatus}
        baseURL={"/schedule-check"}
      />
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default ScheduleCheckList;
