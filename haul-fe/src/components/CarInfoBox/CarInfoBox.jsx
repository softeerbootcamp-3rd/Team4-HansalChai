import styled from "styled-components";
import theme from "../../styles/theme/Theme.jsx";
import Porter from "../../assets/pngs/porter.png";
import Typography from "../Typhography/Typhography.jsx";
import Margin from "../Margin/Margin.jsx";
import UnderBar from "../UnderBar/UnderBar.jsx";

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
  ${theme.flex.flexColumn};
  align-items: left;
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${theme.colors.cardBorder};
  padding: 15px;
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
  left: -10%;
  top: -5%;
  border-radius: 10px;
  background: url(${(props) => CarTypeImage[props.type]});
`;
const QuantityBox = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  width: 30px;
  height: 30px;
`;

const DescriptionTextArea = styled.div`
  width: 100%;
  ${theme.flex.flexBetween};
`;

const CarInfoBox = ({
  phase,
  type,
  capacity,
  volumn,
  quantity = 1,
  children,
}) => {
  return (
    <CarInfoFrame>
      <Typography font={"semiBold16"}>{CarInfoDescription[phase]}</Typography>
      <Margin height="8px" />
      <UnderBar />
      <Margin height="8px" />
      <CarCard>
        <QuantityBox>
          {quantity !== 1 ? (
            <Typography font={"semiBold20"}>{"x" + quantity}</Typography>
          ) : (
            ""
          )}
        </QuantityBox>
        <CarCardImage type={type} />
      </CarCard>
      <Margin height="8px" />
      <DescriptionTextArea>
        <Typography font={"semiBold16"}>차종</Typography>
        <Typography font={"medium16"}>{type}</Typography>
      </DescriptionTextArea>
      <Margin height="8px" />
      <UnderBar />
      <Margin height="8px" />
      <DescriptionTextArea>
        <Typography font={"semiBold16"}>적재량</Typography>
        <Typography font={"medium16"}>{capacity}</Typography>
      </DescriptionTextArea>
      <Margin height="8px" />
      <DescriptionTextArea>
        <Typography font={"semiBold16"}>최대 너비,길이,높이</Typography>
        <Typography font={"medium16"}>{volumn}</Typography>
      </DescriptionTextArea>
    </CarInfoFrame>
  );
};

export default CarInfoBox;
