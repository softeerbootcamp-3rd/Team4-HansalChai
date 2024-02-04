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
  alertRed: "#D83B3B",
  successGreen: "#0D9276",
  unselectedGray: "#ADADAD",
};

const font = {
  mainTitle: `
        font-family: 'pretendard-bold';
        font-size: 26px;
        line-height: 31px;
      `,
};

const flex = {
  flexCenter: `
        display: flex;
        justify-content: center;
        align-items: center;
      `,
  flexCenterColumn: `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `,
  flexBetween: `
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
