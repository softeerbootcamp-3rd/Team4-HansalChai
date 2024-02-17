import styled from "styled-components";
import Typography from "../../../../components/Typhography/Typhography.jsx";
import Margin from "../../../../components/Margin/Margin.jsx";
import UnderBar from "../../../../components/UnderBar/UnderBar.jsx";
//import DummyCustomerImg from "../../../../assets/pngs/dummy.png";

const CustomerInfoDescription = {
  before: "일을 맡겨주신 이용자 분을 소개할게요.",
  reserv: "예약자 분의 정보를 알려드릴게요.",
  moving: "예약자 분의 정보를 알려드릴게요.",
  after: "일을 맡겨주셨던 예약자 분의 정보를 알려드릴게요."
};

const CustomerInfoFrame = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: left;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 15px;
`;

const CustomerImage = styled.img`
  border-radius: 16px;
  background-repeat: no-repeat;
  object-fit: cover;
  width: 66px;
  height: 66px;
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

const CustomerDescriptionItem = styled.section`
  width: 100%;
  ${({ theme }) => theme.flex.flexColumn};
  align-items: start;
  justify-content: space-between;
`;

const CustomerInfoBox = ({ phase, name, tel, picture = null }) => {
  //if (!picture) {
    //picture = DummyCustomerImg;
  //}
  return (
    <CustomerInfoFrame>
      <Typography font={"semiBold16"}>
        {CustomerInfoDescription[phase]}
      </Typography>
      <Margin height="8px" />
      <UnderBar />
      <Margin height="8px" />
      <DescriptionArea>
        <CustomerImage src={picture} />
        <DescriptionTextList>
          <CustomerDescriptionItem>
            <Typography font={"semiBold16"}>{name}</Typography>
          </CustomerDescriptionItem>
          <CustomerDescriptionItem>
            <Typography font={"medium16"}>{tel}</Typography>
          </CustomerDescriptionItem>
        </DescriptionTextList>
      </DescriptionArea>
    </CustomerInfoFrame>
  );
};

export default CustomerInfoBox;
