import styled from "styled-components";
import Porter from "../../assets/pngs/porter.png";
import Mighty from "../../assets/pngs/mighty.png";
import Typography from "../Typhography/Typhography.jsx";
import Margin from "../Margin/Margin.jsx";
import UnderBar from "../UnderBar/UnderBar.jsx";

//TODO: 차량이미지 백엔드로 넘길 것 - 지금은 mockup임
const CarTypeImage = {
  포터2: Porter,
  마이티3: Mighty
};

const CarInfoDescription = {
  before: "이런 차량을 제공해드릴게요.",
  reserv: "이런 차량을 제공해드릴게요.",
  moving: "이런 차량으로 운송하고 있어요.",
  after: "이런 차량을 제공해드렸어요."
};

const CarInfoFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: left;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
`;

const CarCard = styled.div`
  background-color: ${({ theme }) => theme.colors.carBackground};
  border-radius: 10px;
  width: 100%;
  height: 170px;
  border: none;
  position: relative;
  overflow: hidden;
`;

const CarCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
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
  ${({ theme }) => theme.flex.flexBetween};
`;

const CarInfoBox = ({ phase, type, capacity, volumn, quantity = 1 }) => {
  return (
    <CarInfoFrame>
      <Typography font={"semiBold16"}>{CarInfoDescription[phase]}</Typography>
      <Margin height="8px" />
      <UnderBar />
      <Margin height="8px" />
      <CarCard>
        <QuantityBox>
          {quantity !== 1 ? (
            <Typography font={"semiBold20"}>{`x${quantity}`}</Typography>
          ) : (
            ""
          )}
        </QuantityBox>
        <CarCardImage type={type} src={CarTypeImage[type]} />
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
