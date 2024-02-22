import styled from "styled-components";
import Truck from "../../../../assets/svgs/BigTruck.svg";
import Margin from "../../../../components/Margin/Margin";
import Typography from "../../../../components/Typhography/Typhography";

const AdvisorFrame = () => {
  return (
    <Frame>
      <UpperTyphography font={"bold20"} color={"white"}>
        예약 번호를 확인해주세요!
      </UpperTyphography>
      <Margin height="12px" />
      <UpperTyphography font={"medium16"} color={"white"}>
        예약 번호는 12자리의 <br />
        숫자로 이루어져 있어요.
      </UpperTyphography>
      <TruckImg src={Truck} height={50} width={80} fill="white" />
    </Frame>
  );
};

const TruckImg = styled.img`
  position: absolute;
  width: 126px;
  height: 90px;
  border: none;
  right: 5%;
  bottom: 10%;
  fill: ${props => props.theme.colors[props.fill]};
  object-fit: scale-down;
  object-position: center;
`;

const Frame = styled.div`
  width: 100%;
  min-height: 202px;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: left;
  background-color: ${({ theme }) => theme.colors.mainColor};
  opacity: 0.4;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
  cursor: default;
  position: relative;
`;

const UpperTyphography = styled(Typography)`
  z-index: 1;
`;

export default AdvisorFrame;
