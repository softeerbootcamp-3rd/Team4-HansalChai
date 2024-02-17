import styled from "styled-components";
import Typography from "../Typhography/Typhography";
import TypographySpan from "../Typhography/TyphographySpan";
import UnderBar from "../UnderBar/UnderBar";
import Margin from "../Margin/Margin";
import { LuClock4 } from "react-icons/lu";

const Box = styled.div`
  height: auto;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayBoxBorder};
  background: ${({ theme }) => theme.colors.grayBoxBackground};
  padding: 10px 18px;
`;

const IconedCaption = styled.div`
  ${({ theme }) => theme.flex.flexRowAlignCenter};
  gap: 4px;
`;

const IconBlueBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  ${({ theme }) => theme.flex.flexCenter};
  background-color: ${({ theme }) => theme.colors.lightBlue};
`;

const DriveTimeBox = ({ arriveTime }) => {
  return (
    <Box>
      <Typography font="semiBold16">
        이때까지 <TypographySpan color="subColor">출발지</TypographySpan>에
        도착해주세요.
      </Typography>
      <Margin height="10px" />
      <UnderBar />
      <Margin height="10px" />
      <IconedCaption>
        <IconBlueBox>
          <LuClock4 style={{ width: 16, color: "white" }} />
        </IconBlueBox>
        <Typography font={"regular12"} color={"upperTextColor"}>
          운송일시
        </Typography>
      </IconedCaption>
      <Margin height="2px" />
      <Typography font="bold20">{arriveTime}</Typography>
    </Box>
  );
};

export default DriveTimeBox;
