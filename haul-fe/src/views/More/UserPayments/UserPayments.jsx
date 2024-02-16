import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import styled from "styled-components";
import Carousel from "../../../components/Carousel/Carousel.jsx";
import Card1 from "../../../assets/pngs/card1.png";
import Card2 from "../../../assets/pngs/card2.png";
import Card3 from "../../../assets/pngs/card3.png";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";

const CustomTypo = styled.p`
  ${({ theme }) => theme.font.bold24};
  color: ${({ theme }) => theme.colors.realBlack};
`;

const UserPayments = () => {
  const btnHandler = () => {
    ToastMaker({
      type: "info",
      children: "결제수단 추가하기는 아직 지원하지 않습니다."
    });
  };

  const username = "하울";
  return (
    <MobileLayout>
      <Header>
      <Typography font={"semiBold24"} color={"mainColor"}>내 결제수단</Typography>
      </Header>
      <Margin height="24px" />
      <CustomTypo>
        현재 <span style={{ color: "#596FB7" }}>{username}</span> 님께서 사용할
        수 있는
        <br />
        결제수단은 다음과 같아요.
      </CustomTypo>

      <Margin height="68px" />
      <Carousel
        carouselList={[Card1, Card2, Card3]}
        initialIndex={0}
      ></Carousel>

      <FixedCenterBox bottom="20px">
        <BottomButton role="main" onClick={btnHandler}>
          결제수단 추가하기
        </BottomButton>
      </FixedCenterBox>
    </MobileLayout>
  );
};
export default UserPayments;
