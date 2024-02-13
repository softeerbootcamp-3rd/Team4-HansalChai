import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import { Link } from "react-router-dom";
import SummaryItemBox from "./components/SummaryItemBox.jsx";
import { dummySummary } from "../../../data/DummyData.js";

const Check = () => {
  return (
    <MobileLayout>
      <Header home={false} back={false}>
        <Typography font={"semiBold24"} color={"mainColor"}>
          예약 확인
        </Typography>
      </Header>
      <Margin height="32px" />
      {dummySummary().map((data, index) => (
        <div key={`reserv${index}`}>
          <Link to={`/check/detail/${data.id}`} key={`reserv${index}`}>
            <SummaryItemBox
              model={data.car}
              status={data.status}
              time={data.datetime}
              fee={data.cost}
            />
          </Link>
          <Margin height="20px" />
        </div>
      ))}
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default Check;
