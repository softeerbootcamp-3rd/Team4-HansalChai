import styled from "styled-components";
import { useNavigate } from "react-router";
import Flex from "../../../../components/Flex/Flex.jsx";
import Margin from "../../../../components/Margin/Margin.jsx";
import Typography from "../../../../components/Typhography/Typhography.jsx";
import EmptyIcon from "../../../../assets/svgs/EmptyIcon.svg";
import { UrlMap } from "../../../../data/GlobalVariable.js";

const ToCreateButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.goButton};
  color: ${({ theme }) => theme.colors.halfGray};
  ${({ theme }) => theme.font.semiBold16};
`;

const EmptyListHolder = selectedIndex => {
  const navigate = useNavigate();

  const clickGoButton = () => {
    navigate(UrlMap.choiceTranportTypeUrl);
  };

  const messages = [
    "예약하신 내역이 없어요",
    "진행해야 할 운송 내역이 없어요",
    "진행 중인 운송 내역이 없어요",
    "완료된 운송 내역이 없어요"
  ];

  return (
    <Flex kind={"flexColumnCenter"}>
      <Margin height={"88px"} />
      <img src={EmptyIcon} width={108} />
      <Margin height={"24px"} />
      <Typography font={"semiBold16"} color={"halfGray"}>
        {messages[selectedIndex]}
      </Typography>
      <Margin height={"18px"} />
      <ToCreateButton onClick={clickGoButton}>예약하기</ToCreateButton>
    </Flex>
  );
};

export default EmptyListHolder;
