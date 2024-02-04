const colors = {
  white: "#ffffff",
  black: "#1B1313",
  mainColor: "#000B49",
  subColor: "#446EDA",
  accentColor: "#F3EDC8",
  realBlack: `#000000`,
  darkGray: "#4D4D4D",
  gray: "#717171",
  lightGray: "#E0DEDE",
  alertRed: "#D83B3B",
  successGreen: "#0D9276",
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
