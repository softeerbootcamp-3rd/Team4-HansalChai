import styled from "styled-components";
import theme from "../styles/theme/Theme.jsx";
import TruckSvg from "../assets/svgs/Truck.svg";
import TruckSelectedSvg from "../assets/svgs/Truck_Selected.svg";
import {
  AiOutlineCarryOut as CheckSvg,
  AiOutlineMenu as MoreSvg,
} from "react-icons/ai";
import SelectedCircleSelectedSvg from "../assets/svgs/SelectedCircle_Selected.svg";
import SelectedCircleSvg from "../assets/svgs/SelectedCircle.svg";
import { useNavigate } from "react-router-dom";

const NavigationBarFrame = styled.div`
  position: fixed;
  width: 100%;
  max-width: 360px;
  height: 83px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);S
  padding: 6px 0 21px;
  cursor: default;
  ${theme.flex.flexBetweenCenter};
  background-color: ${theme.colors.white};
  border-radius: 16px 16px 0 0;
  box-shadow: 0px 1px 11px 0px rgba(0, 0, 0, 0.15);
  font-family: "semiBold";
  font-size: 12px;
`;

const ItemFrame = styled.div`
  height: 45px;
  ${theme.flex.flexColumnBetween};
  justify-content: space-around;
  align-items: center;
  gap: 4px;
  flex-grow: 1;
  color: ${(props) =>
    props.selected ? theme.colors.mainColor : theme.colors.unselectedGray};
`;

const TruckImg = styled.img`
  width: 42px;
  height: 23px;
  border: none;
  fill: ${(props) => props.fill};
  color: red;
`;

const SelectedCircleImg = styled.img`
  width: 6px;
  height: 6px;
  background-image: url();
  fill: ${(props) => props.fill};
  color: red;
`;

const NavigationBar = ({ selected = "reserv" }) => {
  let navigator = useNavigate();
  const clickCheck = () => {
    navigator("/check");
  };
  const clickReserv = () => {
    navigator("/reserv");
  };
  const clickMore = () => {
    navigator("/more");
  };

  return (
    <NavigationBarFrame>
      <ItemFrame
        fill={
          selected === "check"
            ? theme.colors.mainColor
            : theme.colors.unselectedGray
        }
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
          fill={selected === "check" ? theme.colors.selectCircle : "none"}
        />
        <CheckSvg
          fill={
            selected === "check"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
          size={42}
        />
        예약 확인
      </ItemFrame>

      <ItemFrame
        fill={
          selected === "reserv"
            ? theme.colors.mainColor
            : theme.colors.unselectedGray
        }
        id="navigator__reserv"
        className="navBarItem"
        onClick={() => {
          clickReserv();
        }}
      >
        <SelectedCircleImg
          src={
            selected === "reserv"
              ? SelectedCircleSelectedSvg
              : SelectedCircleSvg
          }
          fill={selected === "reserv" ? theme.colors.selectCircle : "none"}
        />
        <TruckImg
          src={selected === "reserv" ? TruckSelectedSvg : TruckSvg}
          fill={
            selected === "reserv"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
        />
        용달 신청
      </ItemFrame>
      <ItemFrame
        fill={
          selected === "more"
            ? theme.colors.mainColor
            : theme.colors.unselectedGray
        }
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
          fill={selected === "more" ? theme.colors.selectCircle : "none"}
        />
        <MoreSvg
          fill={
            selected === "more"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
          size={42}
        />
        더보기
      </ItemFrame>
    </NavigationBarFrame>
  );
};

export default NavigationBar;
