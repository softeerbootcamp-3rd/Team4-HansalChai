import styled from "styled-components";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";
import Margin from "../../Margin/Margin.jsx";
import UnderBar from "../../UnderBar/UnderBar.jsx";
import Typography from "../../Typhography/Typhography.jsx";
import MoveSvg from "../../../assets/svgs/MoveIcon.svg";

const ReservItemFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: start;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
  cursor: pointer;
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
  ${({ theme }) => theme.flex.flexCenter};
  background-color: ${({ theme }) => theme.colors.lightBlue};
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
  align-items: center;
  gap: 4px;
`;

const IconedCaption = styled.div`
  ${({ theme }) => theme.flex.flexRowAlignCenter};
  gap: 4px;
`;

//API에 맞게 인자 이름을 고쳐야 하나?
const SummaryItemBox = ({ src, dst, time, fee }) => {
  return (
    <ReservItemFrame>
      <DescriptionTextArea>
        <TextSetFrame align={"start"}>
          <Typography font={"regular12"} color={"upperTextColor"}>
            출발지
          </Typography>
          <Margin height="4px" />
          <Typography font={"bold20"} color={"realBlack"}>
            {src}
          </Typography>
        </TextSetFrame>
        <img src={MoveSvg} alt="dotdotdot" />
        <TextSetFrame align={"end"}>
          <Typography font={"regular12"} color={"upperTextColor"}>
            도착지
          </Typography>
          <Margin height="4px" />
          <Typography font={"bold20"} color={"realBlack"}>
            {dst}
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
          <Margin height="8px" />
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
          <Margin height="8px" />
          <CustomTypo>
            {fee}
            <MoneySub>만원</MoneySub>
          </CustomTypo>
        </TextSetFrame>
      </DescriptionTextArea>
    </ReservItemFrame>
  );
};

export default SummaryItemBox;
