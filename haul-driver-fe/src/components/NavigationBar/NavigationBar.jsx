import styled from "styled-components";
import TruckSvg from "../../assets/svgs/Truck.svg";
import TruckSelectedSvg from "../../assets/svgs/Truck_Selected.svg";
import {
  AiOutlineCarryOut as CheckSvg,
  AiOutlineMenu as MoreSvg
} from "react-icons/ai";
import SelectedCircleSelectedSvg from "../../assets/svgs/SelectedCircle_Selected.svg";
import SelectedCircleSvg from "../../assets/svgs/SelectedCircle.svg";
import { useNavigate } from "react-router-dom";
import Typography from "../Typhography/Typhography.jsx";
import { MaxDeviceWidth, UrlMap } from "../../data/GlobalVariable.js";

const NavigationBarFrame = styled.div`
  position: fixed;
  width: 100%;
  max-width: ${MaxDeviceWidth};
  height: 83px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 0 21px;
  cursor: default;
  ${({ theme }) => theme.flex.flexBetweenCenter};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px 16px 0 0;
  box-shadow: 0px 1px 11px 0px rgba(0, 0, 0, 0.15);
  font-family: "semiBold";
  font-size: 12px;
  z-index: 99;
`;

const ItemFrame = styled.div`
  height: 45px;
  ${({ theme }) => theme.flex.flexColumnBetween};
  justify-content: space-around;
  align-items: center;
  gap: 4px;
  flex-grow: 1;
  color: ${props =>
    props.selected
      ? props.theme.colors.mainColor
      : props.theme.colors.unselectedGray};
`;

const TruckImg = styled.img`
  width: 42px;
  height: 23px;
  border: none;
  fill: ${props => props.theme.colors[props.fill]};
  color: red;
`;

const IconFrame = styled.div`
  color: ${props => props.theme.colors[props.fill]};
`;

const SelectedCircleImg = styled.img`
  width: 6px;
  height: 6px;
  fill: ${props => props.theme.colors[props.fill]};
  color: red;
`;

const NavigationBar = ({ selected = "create" }) => {
  const navigator = useNavigate();
  const clickCheck = () => {
    navigator(UrlMap.scheduleCheckPageUrl);
  };
  const clickCreate = () => {
    navigator(UrlMap.scheduleCreateDetailPageUrl);
  };
  const clickMore = () => {
    navigator(UrlMap.morePageUrl);
  };

  return (
    <NavigationBarFrame>
      <ItemFrame
        id="navigator__check"
        className="navBarItem"
        onClick={() => {
          clickCheck();
        }}
      >
        <SelectedCircleImg
          src={
            selected === "check" ? SelectedCircleSelectedSvg : SelectedCircleSvg
          }
        />
        <IconFrame fill={selected === "check" ? "mainColor" : "unselectedGray"}>
          <CheckSvg size={27} />
        </IconFrame>
        <Typography
          color={selected === "check" ? "mainColor" : "unselectedGray"}
        >
          예약 확인
        </Typography>
      </ItemFrame>

      <ItemFrame
        id="navigator__create"
        className="navBarItem"
        onClick={() => {
          clickCreate();
        }}
      >
        <SelectedCircleImg
          src={
            selected === "create"
              ? SelectedCircleSelectedSvg
              : SelectedCircleSvg
          }
        />
        <TruckImg
          src={selected === "create" ? TruckSelectedSvg : TruckSvg}
          fill={selected === "create" ? "mainColor" : "unselectedGray"}
        />
        <Typography
          color={selected === "create" ? "mainColor" : "unselectedGray"}
        >
          일정 잡기
        </Typography>
      </ItemFrame>
      <ItemFrame
        id="navigator__more"
        className="navBarItem"
        onClick={() => {
          clickMore();
        }}
      >
        <SelectedCircleImg
          src={
            selected === "more" ? SelectedCircleSelectedSvg : SelectedCircleSvg
          }
        />
        <IconFrame fill={selected === "more" ? "mainColor" : "unselectedGray"}>
          <MoreSvg size={28} />
        </IconFrame>
        <Typography
          color={selected === "more" ? "mainColor" : "unselectedGray"}
        >
          더보기
        </Typography>
      </ItemFrame>
    </NavigationBarFrame>
  );
};

export default NavigationBar;
