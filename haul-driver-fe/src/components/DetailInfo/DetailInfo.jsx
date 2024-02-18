import styled from "styled-components";
import Typography from "../Typhography/Typhography.jsx";
import UnderBar from "../UnderBar/UnderBar.jsx";
import Margin from "../Margin/Margin.jsx";
import RouteMap from "../Map/RouteMap/RouteMap.jsx";
import Flex from "../Flex/Flex.jsx";
import RouteIcon from "../../assets/svgs/RouteIcon.svg";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";

const DetailInfoBox = styled.div`
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.grayBoxBorder};
  background-color: ${props => props.theme.colors.grayBoxBackground};
  width: 100%;
  height: auto;
  padding: 15px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.inputGray};
  padding: 16px 8px;
`;

const PlaceInfo = styled.div`
  width: 100%;
  height: auto;
`;

const Icon = styled.img`
  width: 25px;
  margin-right: 5px;
`;

const IconBlueBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  ${props => props.theme.flex.flexCenter};
  background-color: ${props => props.theme.colors.lightBlue};
`;

const RouteMapBox = styled.div`
  width: "100%";
  height: "227px";
`;

const DetailInfo = ({
  srcCoordinate,
  srcName,
  srcAddress,
  srcDetailAddress,
  dstCoordinate,
  dstName,
  dstAddress,
  dstDetailAddress,
  fee,
  time
}) => {
  function changeTime(time) {
    if (time >= 1) {
      // 1시간 이상일 경우 소수점을 다 짤라서 반환
      return Math.floor(time);
    } else {
      // 1시간 미만일 경우 분으로 변환하여 소수점을 다 짤라서 반환
      return Math.floor(time * 60);
    }
  }
  function isOneOverFun(time) {
    return time >= 1 ? true : false;
  }

  return (
    <DetailInfoBox>
      <Typography font="semiBold16">
        비용과 도착 시간을 알려드릴게요.
      </Typography>
      <Margin height="12px" />
      <UnderBar />
      <Margin height="12px" />

      <RouteMapBox>
        <RouteMap origin={srcCoordinate} destination={dstCoordinate} />
      </RouteMapBox>

      <Margin height="12px" />

      <InfoBox>
        <Flex kind="flexRow">
          <Icon src={RouteIcon} />
          <Flex kind="flexColumnBetween">
            <PlaceInfo>
              <Typography font="medium10" color="grayText" singleLine={true}>
                {srcName}
              </Typography>
              <Margin height="4px" />
              <Typography font="semiBold12" singleLine={true}>
                {srcAddress}
              </Typography>
            </PlaceInfo>

            <PlaceInfo>
              <Typography font="medium10" color="grayText">
                {dstName}
              </Typography>
              <Margin height="4px" />

              <Typography font="semiBold12">{dstAddress}</Typography>
            </PlaceInfo>
          </Flex>
        </Flex>

        <Margin height="16px" />
        <UnderBar />
        <Margin height="16px" />

        <Flex kind="flexBetweenAlignCenter">
          <Flex kind="flexColumn">
            <Flex kind="flexBetweenAlignCenter">
              <IconBlueBox>
                <AiOutlineDollarCircle style={{ width: 16, color: "white" }} />
              </IconBlueBox>
              <Margin width="8px" height="100%" />
              <Typography font="regular14" color="grayText">
                비용
              </Typography>
            </Flex>
            <Margin height="8px" />
            <Flex kind="flexBetweenAlignCenter">
              <Typography font="bold24">{fee}</Typography>
              <Typography font="regular14" color="grayText">
                만원
              </Typography>
            </Flex>
          </Flex>

          <Flex kind="flexColumn">
            <Flex kind="flexRowAlignCenter">
              <IconBlueBox>
                <LuClock4 style={{ width: 16, color: "white" }} />
              </IconBlueBox>
              <Margin width="6px" height="100%" />
              <Typography font="regular14" color="grayText">
                예상도착 시간
              </Typography>
            </Flex>
            <Margin height="8px" />
            <Flex kind="flexRowAlignCenter">
              <Typography font="bold24">{changeTime(time)}</Typography>
              <Margin width="6px" height="100%" />
              <Typography font="regular14" color="grayText">
                {isOneOverFun(time) ? "시간" : "분"}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </InfoBox>
    </DetailInfoBox>
  );
};

export default DetailInfo;
