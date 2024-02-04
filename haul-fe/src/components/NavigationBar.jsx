import styled from "styled-components";
import theme from "../styles/theme/Theme.jsx";

const CheckSvg = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="24"
    viewBox="0 0 23 24"
    fill={selected ? theme.colors.mainColor : theme.colors.unselectedGray}
  >
    <path d="M21.9219 2.53906H17.1641V0.726562C17.1641 0.601953 17.0621 0.5 16.9375 0.5H15.3516C15.227 0.5 15.125 0.601953 15.125 0.726562V2.53906H7.875V0.726562C7.875 0.601953 7.77305 0.5 7.64844 0.5H6.0625C5.93789 0.5 5.83594 0.601953 5.83594 0.726562V2.53906H1.07812C0.576855 2.53906 0.171875 2.94404 0.171875 3.44531V22.25C0.171875 22.7513 0.576855 23.1562 1.07812 23.1562H21.9219C22.4231 23.1562 22.8281 22.7513 22.8281 22.25V3.44531C22.8281 2.94404 22.4231 2.53906 21.9219 2.53906ZM20.7891 21.1172H2.21094V4.57812H5.83594V5.9375C5.83594 6.06211 5.93789 6.16406 6.0625 6.16406H7.64844C7.77305 6.16406 7.875 6.06211 7.875 5.9375V4.57812H15.125V5.9375C15.125 6.06211 15.227 6.16406 15.3516 6.16406H16.9375C17.0621 6.16406 17.1641 6.06211 17.1641 5.9375V4.57812H20.7891V21.1172ZM16.4844 9.22266H14.9211C14.7767 9.22266 14.6379 9.29346 14.5529 9.40957L10.2794 15.2945L8.44707 12.774C8.36211 12.6579 8.22617 12.5871 8.07891 12.5871H6.51562C6.33154 12.5871 6.22393 12.7967 6.33154 12.9468L9.91123 17.8745C9.95356 17.9324 10.009 17.9796 10.0729 18.0121C10.1369 18.0446 10.2076 18.0615 10.2794 18.0615C10.3511 18.0615 10.4219 18.0446 10.4859 18.0121C10.5498 17.9796 10.6052 17.9324 10.6476 17.8745L16.6685 9.58516C16.7761 9.43223 16.6685 9.22266 16.4844 9.22266Z" />
  </svg>
);

const TruckSvg = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="24"
    viewBox="0 0 42 24"
    fill={selected ? theme.colors.mainColor : theme.colors.unselectedGray}
  >
    <path d="M36.0448 4.63526H29.0031V0.5H4.69727V3.92517H6.39816V2.17081H27.3022V8.93761H29.0031V6.29772H32.5069V12.1038H40.2205V14.5348H38.8173V16.2056H40.2205V18.6534H38.1879C37.8052 17.0661 36.3425 15.8715 34.6076 15.8715C32.8726 15.8715 31.4184 17.0661 31.0357 18.6534H29.0031V10.6168H27.3022V18.6534H17.1053C16.7226 17.0661 15.2598 15.8715 13.5249 15.8715C11.79 15.8715 10.3357 17.0661 9.95304 18.6534H6.39816V15.6292H4.69727V20.3242H9.94453C10.3272 21.9115 11.79 23.1061 13.5249 23.1061C15.2598 23.1061 16.7226 21.9198 17.1053 20.3242H31.0357C31.4184 21.9115 32.8811 23.1061 34.6161 23.1061C36.351 23.1061 37.8137 21.9198 38.1964 20.3242H41.9214V10.9509L36.0448 4.63526ZM34.2078 10.4413V6.30608H35.2879L39.1404 10.4413H34.2078ZM13.5249 21.4353C12.4363 21.4353 11.5434 20.5665 11.5434 19.4888C11.5434 18.4195 12.4278 17.5423 13.5249 17.5423C14.622 17.5423 15.5065 18.4111 15.5065 19.4888C15.5065 20.5581 14.622 21.4353 13.5249 21.4353ZM34.6161 21.4353C33.5275 21.4353 32.6345 20.5665 32.6345 19.4888C32.6345 18.4195 33.519 17.5423 34.6161 17.5423C35.7046 17.5423 36.5976 18.4111 36.5976 19.4888C36.5891 20.5581 35.7046 21.4353 34.6161 21.4353Z" />
    <path d="M14.3757 18.6533H12.6748V20.3241H14.3757V18.6533Z" />
    <path d="M35.4665 18.6533H33.7656V20.3241H35.4665V18.6533Z" />
    <path d="M9.11142 8.9458H3.48145V10.6166H9.11142V8.9458Z" />
    <path d="M1.78 8.9458H0.0791016V10.6166H1.78V8.9458Z" />
    <path d="M13.7286 5.60449H8.09863V7.2753H13.7286V5.60449Z" />
    <path d="M6.39816 5.60449H4.69727V7.2753H6.39816V5.60449Z" />
    <path d="M13.7286 12.2876H8.09863V13.9584H13.7286V12.2876Z" />
    <path d="M6.39816 12.2876H4.69727V13.9584H6.39816V12.2876Z" />
  </svg>
);

const MoreSvg = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="17"
    viewBox="0 0 19 17"
    fill={selected ? theme.colors.mainColor : theme.colors.unselectedGray}
  >
    <path d="M18.5625 0H0.1875C0.084375 0 0 0.084375 0 0.1875V1.6875C0 1.79062 0.084375 1.875 0.1875 1.875H18.5625C18.6656 1.875 18.75 1.79062 18.75 1.6875V0.1875C18.75 0.084375 18.6656 0 18.5625 0ZM18.5625 14.625H0.1875C0.084375 14.625 0 14.7094 0 14.8125V16.3125C0 16.4156 0.084375 16.5 0.1875 16.5H18.5625C18.6656 16.5 18.75 16.4156 18.75 16.3125V14.8125C18.75 14.7094 18.6656 14.625 18.5625 14.625ZM18.5625 7.3125H0.1875C0.084375 7.3125 0 7.39687 0 7.5V9C0 9.10312 0.084375 9.1875 0.1875 9.1875H18.5625C18.6656 9.1875 18.75 9.10312 18.75 9V7.5C18.75 7.39687 18.6656 7.3125 18.5625 7.3125Z" />
  </svg>
);

const SelectedCircle = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill={selected ? "#596FB7" : "none"}
  >
    <circle cx="3" cy="3" r="3" />
  </svg>
);

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

const NavigationBar = ({ selected = "reserv", children }) => {
  return (
    <NavigationBarFrame>
      <ItemFrame selected={selected === "more"} id="navigator__more">
        <SelectedCircle selected={selected === "more"} />
        <MoreSvg selected={selected === "more"} />
        더보기
      </ItemFrame>
      <ItemFrame selected={selected === "reserv"} id="navigator__reserv">
        <SelectedCircle selected={selected === "reserv"} />
        <TruckSvg selected={selected === "reserv"} />
        용달 신청
      </ItemFrame>
      <ItemFrame selected={selected === "check"} id="navigator__check">
        <SelectedCircle selected={selected === "check"} />
        <CheckSvg selected={selected === "check"} />
        예약 확인
      </ItemFrame>
    </NavigationBarFrame>
  );
};

export default NavigationBar;
