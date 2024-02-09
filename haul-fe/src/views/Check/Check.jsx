import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import Typography from "../../components/Typhography/Typhography.jsx";
import { useNavigate } from "react-router-dom";
import SummaryItemBox from "./components/SummaryItemBox.jsx";

const Check = () => {
  const navigate = useNavigate();
  const dummyData = [
    {
      model: "1톤 포터(냉동)",
      status: "배정 중",
      time: "2024.1.10 12:10",
      fee: 17,
    },
    {
      model: "2.5톤 마이티(카고)",
      status: "운송 완료",
      time: "2024.1.1 10:10",
      fee: 25,
    },
  ];

  const clickUserInfo = () => {
    navigate("/more/user-info");
  };

  return (
    <MobileLayout>
      <Margin height="10px" />
      <Header home={false} back={false}>
        <Typography font={"semiBold24"}>예약 확인</Typography>
      </Header>
      <Margin height="32px" />
      {dummyData.map((data, index) => (
        <div key={`reserv${index}`}>
          <SummaryItemBox
            model={data.model}
            status={data.status}
            time={data.time}
            fee={data.fee}
          />
          <Margin height="20px" />
        </div>
      ))}
      <Flex kind="flexColumn"></Flex>
      <NavigationBar selected="check" />
    </MobileLayout>
  );
};

export default Check;
