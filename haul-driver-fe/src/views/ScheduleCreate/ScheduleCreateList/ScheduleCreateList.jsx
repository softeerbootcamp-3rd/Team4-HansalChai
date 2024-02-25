import { useEffect, useState } from "react";
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
import EmptyListHolder from "./EmptyListHolder.jsx";
import styled from "styled-components";
import { MaxDeviceWidth } from "../../../data/GlobalVariable.js";

const Floater = styled.div`
  overflow: visible;
  height: fit-content;
  width: 100%;
  max-width: calc(${MaxDeviceWidth} - 40px);
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: white;
`;

const HorizontalLine = styled(UnderBar)`
  width: calc(100% + 40px);
  left: -20px;
  position: relative;
`;

let lastTabbar = 0;

const ScheduleCreateList = () => {
  const [selectedStatus, setSelectedStatus] = useState(lastTabbar);
  const driverName = getUserName();
  const statusList = ["추천", "가격", "날짜"];
  const fetcherList = [
    functionBinder(getDriverSummaryList, { sortBy: "default" }),
    functionBinder(getDriverSummaryList, { sortBy: "fee" }),
    functionBinder(getDriverSummaryList, { sortBy: "datetime" })
  ];

  useEffect(() => {
    lastTabbar = selectedStatus;
  }, [selectedStatus]);

  return (
    <MobileLayout>
      <Floater>
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
        <HorizontalLine />
      </Floater>
      <Margin height="110px" />
      <InfiniteList
        fetcher={fetcherList}
        listStatus={selectedStatus}
        baseURL={"/schedule-create"}
        emptyListView={EmptyListHolder()}
      />
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="create" />
    </MobileLayout>
  );
};

export default ScheduleCreateList;
