import styled from "styled-components";
import theme from "../styles/theme/Theme.jsx";
import Porter from "../assets/pngs/porter.png";

const CarTypeImage = {
  포터2: Porter,
};

const CarInfoDescription = {
  before: "이런 차량을 제공해드릴게요.",
  moving: "이런 차량으로 운송하고 있어요.",
  after: "이런 차량을 제공해드렸어요.",
};

const CarInfoFrame = styled.div`
  width: 100%;
  ${theme.flex.flexCenterColumn};
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${theme.colors.cardBorder};
  gap: 8px;
  padding: 15px;
`;

const CarInfoTitle = styled.h2`
  font-family: "Bold";
  font-size: 16px;
  width: 100%;
  align-text: left;
  color: ${theme.colors.black};
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.cardBackground};
`;

const CarCard = styled.div`
  background-color: ${theme.colors.carBackground};
  border-radius: 10px;
  width: 100%;
  height: 170px;
  border: none;
  position: relative;
  overflow: hidden;
`;

const CarCardImage = styled.img`
  position: absolute;
  width: 120%;
  height: 120%;
  left: calc(-10%);
  top: calc(-5%);
  border-radius: 10px;
  background: url(${(props) => CarTypeImage[props.type]});
`;

const DescriptionTextArea = styled.div`
  width: 100%;
  ${theme.flex.flexBetween};
`;

const DescriptionSubTitle = styled.p`
  font-family: "semiBold";
  font-size: 16px;
  color: ${theme.colors.black};
`;

const DescriptionContent = styled.p`
  font-family: "regular";
  font-size: 16px;
  color: ${theme.colors.black};
`;

const CarInfoBox = ({ phase, type, capacity, volumn, children }) => {
  return (
    <CarInfoFrame>
      <CarInfoTitle>{CarInfoDescription[phase]}</CarInfoTitle>
      <Bar />
      <CarCard>
        <CarCardImage type={type} />
      </CarCard>
      <DescriptionTextArea>
        <DescriptionSubTitle>차종</DescriptionSubTitle>
        <DescriptionContent>{type}</DescriptionContent>
      </DescriptionTextArea>
      <Bar />
      <DescriptionTextArea>
        <DescriptionSubTitle>적재량</DescriptionSubTitle>
        <DescriptionContent>{capacity}</DescriptionContent>
      </DescriptionTextArea>
      <DescriptionTextArea>
        <DescriptionSubTitle>최대 너비,길이,높이</DescriptionSubTitle>
        <DescriptionContent>{volumn}</DescriptionContent>
      </DescriptionTextArea>
    </CarInfoFrame>
  );
};

export default CarInfoBox;
