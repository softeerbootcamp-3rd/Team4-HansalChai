import styled from "styled-components";
import { IoMdTime } from "react-icons/io";
import { AiOutlineDashboard, AiOutlineCodepen } from "react-icons/ai";
import Typography from "../Typhography/Typhography";
import Flex from "../Flex/Flex";
import Margin from "../Margin/Margin";
import RouteIcon from "../../assets/svgs/HaulRouteIcon.svg";
import GPSIcon from "../../assets/svgs/GPSIcon.svg";

const HaulInfoBoxFlex = styled.div`
  ${props => props.theme.flex.flexColumn};
  gap: 16px;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${props => props.theme.colors.inputGray};
  ${props => props.theme.flex.flexCenter};
  margin-right: 12px;
  position: relative;
`;

const Icon = styled.img`
  width: 26px;
  position: absolute;
  top: 12px;
  left: 11.5px;
`;
const GpsIcon = styled.img`
  width: 18px;
`;
const UnderBar = styled.div`
  width: calc(100% + 40px);
  transform: translateX(-20px);
  height: 1.5px;
  background-color: ${props => props.theme.colors.grayBoxBorder};
`;

const HaulInfoBox = ({
  time,
  srcName,
  srcAddres,
  srcDetailAddress,
  dstName,
  dstAddress,
  dstDetailAddress,
  load,
  width,
  length,
  height
}) => {
  return (
    <>
      <UnderBar />
      <Margin height="20px" />
      <Typography font="bold20">운송정보</Typography>
      <Margin height="20px" />
      <HaulInfoBoxFlex>
        <Flex kind="flexRow">
          <IconBox>
            <IoMdTime size="26px" />
          </IconBox>
          <Flex kind="flexColumn">
            <Margin height="4px" />
            <Typography font="bold16">운송 일시</Typography>
            <Margin height="6px" />
            <Typography font="medium14">{time}</Typography>
          </Flex>
        </Flex>

        <Flex kind="flexRow">
          <IconBox>
            <Icon src={RouteIcon} />
          </IconBox>
          <Flex kind="flexColumn">
            <Margin height="4px" />
            <Typography font="bold16">출발지</Typography>
            <Margin height="4px" />
            <Typography font="medium12">{srcAddres}</Typography>
            <Typography font="medium12" color="grayText">
              {srcName && `${srcName}, `} {srcDetailAddress}
            </Typography>
          </Flex>
        </Flex>

        <Flex kind="flexRow">
          <IconBox>
            <GpsIcon src={GPSIcon} />
          </IconBox>
          <Flex kind="flexColumn">
            <Margin height="4px" />
            <Typography font="bold16">도착지</Typography>
            <Margin height="4px" />
            <Typography font="medium12">{dstAddress}</Typography>
            <Typography font="medium12" color="grayText">
              {dstName && `${dstName}, `} {dstDetailAddress}
            </Typography>
          </Flex>
        </Flex>

        <Flex kind="flexRow">
          <IconBox>
            <AiOutlineDashboard size="26px" />
          </IconBox>
          <Flex kind="flexColumn">
            <Margin height="4px" />
            <Typography font="bold16">무게</Typography>
            <Margin height="6px" />
            <Typography font="medium14">{load}KG</Typography>
          </Flex>
        </Flex>

        <Flex kind="flexRow">
          <IconBox>
            <AiOutlineCodepen size="26px" />
          </IconBox>
          <Flex kind="flexColumn">
            <Margin height="4px" />
            <Typography font="bold16">크기</Typography>
            <Margin height="6px" />
            <Typography font="medium14">
              {width} X {length} X {height} M
            </Typography>
          </Flex>
        </Flex>
      </HaulInfoBoxFlex>
      <Margin height="20px" />
      <UnderBar />
    </>
  );
};

export default HaulInfoBox;
