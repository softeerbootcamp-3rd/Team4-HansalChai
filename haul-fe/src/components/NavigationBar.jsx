import styled from "styled-components";
import theme from "../styles/theme/Theme.jsx";
import TruckSvg from "../assets/svgs/Truck.svg";
import {
  AiOutlineCarryOut as CheckSvg,
  AiOutlineMenu as MoreSvg,
} from "react-icons/ai";
import SelectedCircleSvg from "../assets/svgs/SelectedCircle.svg";

const NavigationBarFrame = styled.div`
  position: relative;
  width: 100%;
  height: 83px;
  padding: 6px 0 21px;
  cursor: default;
  ${theme.flex.flexBetween};
  background-color: ${theme.colors.white};
  border-radius: 16px 16px 0 0;
  box-shadow: 0px 1px 11px 0px rgba(0, 0, 0, 0.15);
  font-family: "semiBold";
  font-size: 12px;
`;

const ItemFrame = styled.div`
  height: 45px;
  ${theme.flex.flexBetween};
  flex-direction: column;
  justify-content: space-around;
  gap: 4px;
  flex-grow: 1;
  color: ${(props) =>
    props.selected ? theme.colors.mainColor : theme.colors.unselectedGray};
`;

const TruckImg = styled.img`
  width: 42px;
  height: 23px;
  background-image: url(${TruckSvg});
  fill: ${(props) => props.fill};
`;

const SelectedCircleImg = styled.img`
  width: 6px;
  height: 6px;
  background-image: url(${SelectedCircleSvg});
  fill: ${(props) => props.fill};
`;

const NavigationBar = ({ selected = "reserv" }) => {
  return (
    <NavigationBarFrame>
      <ItemFrame
        fill={
          selected === "check"
            ? theme.colors.mainColor
            : theme.colors.unselectedGray
        }
        id="navigator__check"
      >
        <SelectedCircleImg
          fill={
            selected === "check"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
        />
        <CheckSvg
          fill={
            selected === "check"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
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
      >
        <SelectedCircleImg
          fill={
            selected === "reserv"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
        />
        <TruckImg
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
      >
        <SelectedCircleImg
          fill={
            selected === "more"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
        />
        <MoreSvg
          fill={
            selected === "more"
              ? theme.colors.mainColor
              : theme.colors.unselectedGray
          }
        />
        더보기
      </ItemFrame>
    </NavigationBarFrame>
  );
};

export default NavigationBar;
