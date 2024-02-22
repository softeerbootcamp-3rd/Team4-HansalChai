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
import { getIsMember } from "../../utils/localStorage.js";

const NavigationBar = ({ selected = "reserv" }) => {
  const navigator = useNavigate();
  const clickCheck = () => {
    navigator(
      getIsMember() === "true"
        ? UrlMap.checkReservationPageUrl
        : UrlMap.checkReservationGuestPageUrl
    );
  };
  const clickReserv = () => {
    navigator(UrlMap.choiceTranportTypeUrl);
  };
  const clickMore = () => {
    navigator(UrlMap.morePageUrl);
  };

  const isSelectedMenu = (
    menu,
    trueValue = "mainColor",
    falseValue = "unSelectedGray"
  ) => {
    return menu === selected ? trueValue : falseValue;
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
          src={isSelectedMenu(
            "check",
            SelectedCircleSelectedSvg,
            SelectedCircleSvg
          )}
        />
        <IconFrame fill={isSelectedMenu("check")}>
          <CheckSvg size={30} />
        </IconFrame>
        <Typography color={isSelectedMenu("check")}>예약 확인</Typography>
      </ItemFrame>

      <ItemFrame
        id="navigator__reserv"
        className="navBarItem"
        onClick={() => {
          clickReserv();
        }}
      >
        <SelectedCircleImg
          src={isSelectedMenu(
            "reserv",
            SelectedCircleSelectedSvg,
            SelectedCircleSvg
          )}
        />
        <TruckImg
          src={isSelectedMenu("reserv", TruckSelectedSvg, TruckSvg)}
          fill={isSelectedMenu("reserv")}
        />
        <Typography color={isSelectedMenu("reserv")}>용달 신청</Typography>
      </ItemFrame>
      <ItemFrame
        id="navigator__more"
        className="navBarItem"
        onClick={() => {
          clickMore();
        }}
      >
        <SelectedCircleImg
          src={isSelectedMenu(
            "more",
            SelectedCircleSelectedSvg,
            SelectedCircleSvg
          )}
        />
        <IconFrame fill={isSelectedMenu("more")}>
          <MoreSvg size={30} />
        </IconFrame>
        <Typography color={isSelectedMenu("more")}>더보기</Typography>
      </ItemFrame>
    </NavigationBarFrame>
  );
};

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
  color: ${({ selected, theme }) =>
    selected ? theme.colors.mainColor : theme.colors.unselectedGray};
`;

const TruckImg = styled.img`
  width: 42px;
  height: 30px;
  border: none;
  fill: ${({ fill, theme }) => theme.colors[fill]};
  object-fit: scale-down;
  object-position: center;
`;

const IconFrame = styled.div`
  color: ${({ theme, fill }) => theme.colors[fill]};
  height: 30px;
  object-fit: scale-down;
  object-position: center;
`;

const SelectedCircleImg = styled.img`
  width: 6px;
  height: 6px;
  fill: ${({ theme, fill }) => theme.colors[fill]};
`;

export default NavigationBar;
