import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import styled from "styled-components";
import Carousel from "../../../components/Carousel/Carousel.jsx";
import Card1 from "../../../assets/svgs/Card1.svg";
import Card2 from "../../../assets/svgs/Card2.svg";
import Card3 from "../../../assets/svgs/Card3.svg";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import { getUserProfile } from "../../../repository/userRepository.js";
import { getUserName, setUserName } from "../../../utils/localStorage.js";
import { useEffect, useState } from "react";

const CustomTypo = styled.p`
  ${({ theme }) => theme.font.bold24};
  color: ${({ theme }) => theme.colors.realBlack};
`;

const getUserInfo = async () => {
  const response = await getUserProfile();
  if (!response.success) throw response;
  setUserName(response.data.name);
  return response.data;
};

const UserPayments = () => {
  const [displayName, setDisplayName] = useState("");

  const btnHandler = () => {
    ToastMaker({
      type: "info",
      children: "결제수단 추가하기는 아직 지원하지 않습니다."
    });
  };

  useEffect(() => {
    const localUserName = getUserName();
    if (localUserName !== null) {
      setDisplayName(localUserName);
      return;
    }
    getUserInfo()
      .then(data => {
        setDisplayName(data.name);
      })
      .catch(res => {
        ToastMaker({ type: "error", children: res.message });
        setDisplayName("사용자");
      });
  }, []);

  return (
    <MobileLayout>
      <Header>
        <Typography font={"semiBold24"} color={"mainColor"}>
          HAUL<span style={{ color: "#596FB7" }}>.</span>
        </Typography>
      </Header>
      <Margin height="24px" />
      <CustomTypo>
        현재 <span style={{ color: "#596FB7" }}>{displayName}</span>
        님께서 사용할 수 있는
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
