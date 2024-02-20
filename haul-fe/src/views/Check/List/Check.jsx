import { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import InfiniteList from "./components/InfiniteList.jsx";
import UnderBar from "../../../components/UnderBar/UnderBar.jsx";
import TabBar from "./components/TabBar.jsx";
import EmptyListHolder from "./components/EmptyListHolder.jsx";
import { getUserSummaryList } from "../../../repository/checkRepository.js";
import { functionBinder } from "../../../utils/helper.js";
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
  position: absolute;
`;

//TODO: API가 운송상태를 구별하여 가져올 수 있게 변경된 후 리스트 수정할 것!
const Check = () => {
  const [selectedStatus, setSelectedStatus] = useState(0);

  const statusList = ["매칭 중", "운송 전", "운송 중", "운송 완료"];

  const fetcherList = [
    functionBinder(getUserSummaryList, { keyword: "매칭 중" }),
    functionBinder(getUserSummaryList, { keyword: "운송 전" }),
    functionBinder(getUserSummaryList, { keyword: "운송 중" }),
    functionBinder(getUserSummaryList, { keyword: "운송 완료" })
  ];

  return (
    <MobileLayout id="CUSTOM" minWidth={"auto"}>
      <Floater>
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
        <HorizontalLine />
      </Floater>
      <Margin height="10px" />
      <InfiniteList
        fetcher={fetcherList}
        listStatus={selectedStatus}
        emptyListView={EmptyListHolder(selectedStatus)}
      />
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default Check;
