import styled from "styled-components";
import Typography from "../../../../components/Typhography/Typhography.jsx";
import Margin from "../../../../components/Margin/Margin.jsx";
import UnderBar from "../../../../components/UnderBar/UnderBar.jsx";
import DummyDriverImg from "../../../../assets/pngs/dummy.png";

const DriverInfoDescription = {
  before: "차를 운전하실 기사님을 구하고 있어요.",
  reserv: "차를 운전하실 기사님을 알려드릴게요.",
  moving: "차를 운전중이신 기사님을 알려드릴게요.",
  after: "차를 운전하셨던 기사님을 알려드릴게요."
};

const DriverInfoFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: left;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
`;

const DriverImage = styled.img`
  border-radius: 16px;
  background-repeat: no-repeat;
  object-fit: cover;
  width: 130px;
  height: 130px;
  object-fit: scale-down;
  object-position: center;
`;

const DescriptionArea = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexRow};
`;

const DescriptionTextList = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  justify-content: space-between;
  padding: 8px 0;
`;

const DriverDescriptionItem = styled.section`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: end;
  justify-content: space-between;
`;

const DriverInfoBox = ({ phase, name, tel, picture }) => {
  if (!picture) {
    picture = DummyDriverImg;
  }
  return (
    <DriverInfoFrame>
      <Typography font={"semiBold16"}>
        {DriverInfoDescription[phase]}
      </Typography>
      <Margin height="8px" />
      <UnderBar />
      <Margin height="8px" />
      {phase === "before" ? (
        <Typography>기사님이 정해지면 알려드릴게요.</Typography>
      ) : (
        <DescriptionArea>
          <DriverImage src={picture} />
          <DescriptionTextList>
            <DriverDescriptionItem>
              <Typography font={"bold20"}>이름</Typography>
              <Typography font={"medium16"}>{name}</Typography>
            </DriverDescriptionItem>
            <DriverDescriptionItem>
              <Typography font={"bold20"}>전화번호</Typography>
              <Typography font={"medium16"}>{tel}</Typography>
            </DriverDescriptionItem>
          </DescriptionTextList>
        </DescriptionArea>
      )}
    </DriverInfoFrame>
  );
};

export default DriverInfoBox;
