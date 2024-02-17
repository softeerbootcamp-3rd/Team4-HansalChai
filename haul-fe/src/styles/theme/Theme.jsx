import { MaxDeviceWidth } from "../../data/GlobalVariable";

const colors = {
  white: "#ffffff",
  black: "#1B1313",
  mainColor: "#000B49",
  subColor: "#446EDA",
  disabledColor: "#D8D9DA",
  accentColor: "#F3EDC8",
  realBlack: `#000000`,
  darkGray: "#4D4D4D",
  gray: "#717171",
  lightGray: "#E0DEDE",
  lightBlue: "#2368F7",
  alertRed: "#D83B3B",
  grayBoxBorder: "rgba(0, 0, 0, 0.1)",
  grayBoxBackground: "rgba(0, 0, 0, 0.02)",
  successGreen: "#0D9276",
  unselectedGray: "#ADADAD",
  cardBackground: "#00000005",
  cardBorder: "#00000019",
  carBackground: "#0000000A",
  inputGray: "rgba(0, 0, 0, 0.04)",
  inputGrayDark: "rgba(0, 0, 0, 0.06)",
  grayText: "rgba(16, 16, 16, 0.5)",
  selectCircle: "#596FB7",
  successBackground: "#0d927519",
  errorBackground: "#d83b3b19",
  warningBackground: "#e6be0019",
  infoBackground: "#e0dede19",
  successColor: "#0d9276",
  errorColor: "#d83b3b",
  warningColor: "#e6be00",
  infoColor: "#afafaf",
  subButtonBackground: "#F3EDC8",
  upperTextColor: "#10101080",
  radioUnchecked: "#89939e33",
  tabBarEntry: "#00000033"
};

const font = {
  bold36: `
        font-family: 'bold';
        font-size: 36px;
        line-height: 36px;
      `,
  bold32: `
        font-family: 'bold';
        font-size: 32px;
        line-height: 32px;
      `,
  bold24: `
        font-family: 'bold';
        font-size: 24px;
        line-height: 24px;
      `,
  bold20: `
      font-family: 'bold';
      font-size: 20px;
      line-height: 24px;
    `,
  bold16: `
      font-family: 'bold';
      font-size: 16px;
      line-height: 16px;
    `,
  bold14: `
    font-family: 'bold';
    font-size: 14px;
    line-height: 14px;
  `,
  bold12: `
    font-family: 'bold';
    font-size: 12px;
    line-height: 12px;
  `,
  semiBold20: `
    font-family: 'semiBold';
    font-size: 20px;
    line-height: 20px;
  `,
  semiBold18: `
  font-family: 'semiBold';
  font-size: 18px;
  line-height: 18px;
`,
  semiBold16: `
    font-family: 'semiBold';
    font-size: 16px;
    line-height: 16px;
  `,
  semiBold14: `
  font-family: 'semiBold';
  font-size: 14px;
  line-height: 14px;
`,
  semiBold12: `
    font-family: 'semiBold';
    font-size: 12px;
    line-height: 12px;
  `,
  medium16: `
    font-family: 'medium';
    font-size: 16px;
    line-height: 16px;
  `,
  medium12: `
    font-family: 'medium';
    font-size: 12px;
    line-height: 12px;
  `,
  medium10: `
    font-family: 'medium';
    font-size: 10px;
    line-height: 10px;
  `,
  regular16: `
    font-family: 'regular';
    font-size: 16px;
    line-height: 16px;
  `,
  regular14: `
    font-family: 'regular';
    font-size: 14px;
    line-height: 14px;
  `,
  regular12: `
    font-family: 'regular';
    font-size: 12px;
    line-height: 12px;
  `
};

const flex = {
  flexCenter: `
        display: flex;
        justify-content: center;
        align-items: center;
      `,
  flexColumn: `
        display: flex;
        flex-direction: column;
      `,
  flexColumnCenter: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
  flexColumnBetween: `
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
  flexColumnAroundAlignCenter: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  `,
  flexRow: `
        display: flex;
      `,
  flexRowCenter: `
    display: flex;
    justify-content: center;
  `,

  flexRowAlignCenter: `
      display: flex;
      align-items:center;
    `,
  flexBetweenAlignCenter: `
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,
  flexBetweenCenter: `
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,
  flexBetween: `
    display: flex;
    justify-content: space-between;
    `
};

const animation = {
  modalAnimation: `
  width: calc(${MaxDeviceWidth});
  height: 100vh;
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position:fixed;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);
  animation: toast-animation 1.5s ease-in-out;
  @keyframes toast-animation {
    0% {
      transform: translate(-50%,70%);
    }
    80%{
      transform: translate(-50%,-2%);
    }
    100% {
      transform: translate(-50%,0%);
    }
  }
  `
};

const theme = {
  colors,
  font,
  flex,
  animation
};

export default theme;
