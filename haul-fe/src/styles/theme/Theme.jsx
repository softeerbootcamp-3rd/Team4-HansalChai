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
};

const font = {
  bold36: `
        font-family: 'bold';
        font-size: 36px;
      `,
  bold24: `
        font-family: 'bold';
        font-size: 24px;
      `,
  bold20: `
      font-family: 'bold';
      font-size: 20px;
    `,
  bold16: `
      font-family: 'bold';
      font-size: 16px;
    `,
  bold14: `
    font-family: 'bold';
    font-size: 14px;
  `,
  bold12: `
    font-family: 'bold';
    font-size: 12px;
  `,
  semiBold20: `
    font-family: 'semiBold';
    font-size: 20px;
  `,
  semiBold16: `
    font-family: 'semiBold';
    font-size: 16px;
  `,
  semiBold12: `
    font-family: 'semiBold';
    font-size: 12px;
  `,
  medium16: `
    font-family: 'medium';
    font-size: 16px;
  `,
  medium12: `
    font-family: 'medium';
    font-size: 12px;
  `,
  medium10: `
    font-family: 'medium';
    font-size: 10px;
  `,
  regular16: `
    font-family: 'regular';
    font-size: 16px;
  `,
  regular14: `
    font-family: 'regular';
    font-size: 14px;
  `,
  regular12: `
    font-family: 'regular';
    font-size: 12px;
  `,
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
  flexColumnBetween: `
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
  flexRow: `
        display: flex;
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
};

const theme = {
  colors,
  font,
  flex,
};

export default theme;
