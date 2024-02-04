import styled from "styled-components";
import Typography from "../Typhography/Typhography";
import UnderBar from "../UnderBar/UnderBar";
import Margin from "../Margin/Margin";
import RouteMap from "./RouteMap";
import Flex from "../Flex/Flex";
import RouteIcon from "../../assets/svgs/RouteIcon.svg";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";

const DetailInfoBox = styled.div`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grayBoxBorder};
  background-color: ${(props) => props.theme.colors.grayBoxBackground};
  width: 100%;
  height: auto;
  padding: 15px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.inputGray};
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
  ${(props) => props.theme.flex.flexCenter};
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const RouteMapBox = styled.div`
  width: "100%";
  height: "227px";
`;

const DetailInfo = ({
  srcCoordinate,
  srcName,
  srcAddress,
  dstCoordinate,
  dstName,
  dstAddress,
  fee,
  time,
}) => {
  return (
    <DetailInfoBox>
      <Typography font="semiBold16">
        비용과 도착 시간을 알려드릴게요.
      </Typography>
      <Margin height="8px" />
      <UnderBar />
      <Margin height="8px" />

      <RouteMapBox>
        <RouteMap origin={srcCoordinate} destination={dstCoordinate} />
      </RouteMapBox>

      <Margin height="8px" />

      <InfoBox>
        <Flex kind="flexRow">
          <Icon src={RouteIcon} />
          <Flex kind="flexColumnBetween">
            <PlaceInfo>
              <Typography font="medium10" color="grayText">
                {srcName}
              </Typography>
              <Margin height="4px" />
              <Typography font="semiBold12">{srcAddress}</Typography>
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
              <Typography font="bold24">{time}</Typography>
              <Margin width="6px" height="100%" />
              <Typography font="regular14" color="grayText">
                시간
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </InfoBox>
    </DetailInfoBox>
  );
};

export default DetailInfo;
