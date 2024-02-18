import { useState } from "react";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import InfiniteList from "../../../components/InfiniteList/InfiniteList.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import TabBar from "../../../components/TabBar/TabBar.jsx";
import { getDriverSummaryList } from "../../../repository/createRepository.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import { functionBinder } from "../../../utils/helper.js";
import Typography from "../../../components/Typhography/Typhography.jsx";
import { getUserName } from "../../../utils/localStorage.js";

//TODO: API가 운송상태를 구별하여 가져올 수 있게 변경된 후 리스트 수정할 것!
const ScheduleCreateList = () => {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const driverName = getUserName();
  const statusList = ["추천", "가격", "날짜", "거리"];
  const fetcherList = [
    functionBinder(getDriverSummaryList, { sortBy: "default" }),
    functionBinder(getDriverSummaryList, { sortBy: "fee" }),
    functionBinder(getDriverSummaryList, { sortBy: "datetime" }),
    functionBinder(getDriverSummaryList, { sortBy: "distance" })
  ];

  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font="bold24">
          <TypographySpan color="subColor">{driverName}</TypographySpan>님을
          위한 일정잡기<TypographySpan color="subColor"> .</TypographySpan>
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
        baseURL={"/schedule-create"}
      />
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="create" />
    </MobileLayout>
  );
};

export default ScheduleCreateList;
