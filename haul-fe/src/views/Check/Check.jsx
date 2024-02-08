import Header from "../../components/Header/Header.jsx";
import Margin from "../../components/Margin/Margin.jsx";
import MobileLayout from "../../components/MobileLayout/MobileLayout.jsx";
import Flex from "../../components/Flex/Flex.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import styled from "styled-components";
import Typography from "../../components/Typhography/Typhography.jsx";
import { useNavigate } from "react-router-dom";
import UnderBar from "../../components/UnderBar/UnderBar.jsx";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";

const ReservItemFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: left;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
`;

const DescriptionTextArea = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexBetween};
  padding: 8px;
`;

const TextSetFrame = styled.section`
  ${({ theme }) => theme.flex.flexColumn};
  width: fit-content;
  padding: 4px;
  align-items: ${({ align }) => (align ? align : "center")};
  justify-content: center;
`;

const IconBlueBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  ${(props) => props.theme.flex.flexCenter};
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const MoneySub = styled.sub`
  font-family: "bold";
  font-size: 14px;
  line-height: 14px;
  color: #717171;
`;

const CustomTypo = styled.div`
  width: 100%;
  ${({ theme }) => theme.font.bold20};
  color: ${({ theme }) => theme.colors.realBlack};
  ${({ theme }) => theme.flex.flexRow};
  justify-content: end;
  align-items: end;
  gap: 4px;
`;

const IconedCaption = styled.div`
  ${({ theme }) => theme.flex.flexRowAlignCenter};
  gap: 4px;
`;

const ReservItem = ({ model, status, time, fee }) => {
  return (
    <ReservItemFrame>
      <DescriptionTextArea>
        <TextSetFrame align={"start"}>
          <Typography font={"regular12"} color={"upperTextColor"}>
            운송수단
          </Typography>
          <Margin height="4px" />
          <Typography font={"bold20"} color={"realBlack"}>
            {model}
          </Typography>
        </TextSetFrame>
        <TextSetFrame align={"end"}>
          <Typography font={"regular12"} color={"upperTextColor"}>
            운송상태
          </Typography>
          <Margin height="4px" />
          <Typography font={"bold20"} color={"realBlack"}>
            {status}
          </Typography>
        </TextSetFrame>
      </DescriptionTextArea>
      <Margin height="12px" />
      <UnderBar />
      <Margin height="12px" />
      <DescriptionTextArea>
        <TextSetFrame align={"start"}>
          <IconedCaption>
            <IconBlueBox>
              <LuClock4 style={{ width: 16, color: "white" }} />
            </IconBlueBox>
            <Typography font={"regular12"} color={"upperTextColor"}>
              운송일시
            </Typography>
          </IconedCaption>
          <Margin height="4px" />
          <Typography font={"bold20"} color={"realBlack"}>
            {time}
          </Typography>
        </TextSetFrame>
        <TextSetFrame align={"end"}>
          <IconedCaption>
            <IconBlueBox>
              <AiOutlineDollarCircle style={{ width: 16, color: "white" }} />
            </IconBlueBox>
            <Typography font={"regular12"} color={"upperTextColor"}>
              운송비용
            </Typography>
          </IconedCaption>
          <Margin height="4px" />
          <CustomTypo>
            {fee}
            <MoneySub>만원</MoneySub>
          </CustomTypo>
        </TextSetFrame>
      </DescriptionTextArea>
    </ReservItemFrame>
  );
};

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
          <ReservItem
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
