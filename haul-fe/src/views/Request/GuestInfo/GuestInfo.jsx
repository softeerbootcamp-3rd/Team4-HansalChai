import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Header from "../../../components/Header/Header.jsx";
import Input from "../../../components/Input/Input.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";
import { isPhoneNumber } from "../../../utils/helper.js";

const GuestInfo = () => {
  const navigate = useNavigate();

  const guestName = useRef("");
  const guestTel = useRef("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  function checkGuestInfoAbled() {
    const checkIsButtonDisabled = !(guestName.current.trim() && guestTel.current.trim());
    if (checkIsButtonDisabled !== isButtonDisabled) {
      setButtonDisabled(checkIsButtonDisabled);
    }
  }

  //비회원 로그인 버튼 클릭 시 함수 (정보 입력 완료 버튼)
  function guestInfoBtnFun() {
    //전화번호 형식 예외처리
    if (!isPhoneNumber(guestTel.current)) {
      ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
      return;
    }
    navigate(UrlMap.resultPageUrl);
  }

  return (
    <MobileLayout>
      <Header>
        HAUL<TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold24">
        소중한 고객님의
      </Typography>
      <Margin height="6px" />
      <Typography font="bold24">
        <TypographySpan color="subColor">
            이름  
        </TypographySpan>
        과 
        <TypographySpan color="subColor" style={{marginLeft:"5px"}}>
            전화번호 
        </TypographySpan>
        를 알려주세요.
      </Typography>
      <Margin height="40px" />
      <Typography font="semiBold20">이름</Typography>
      <Margin height="10px" />
      <form>
        <Input
          size="big"
          type="text"
          placeholder="Your Name"
          onChange={({ target: { value } }) => {
            guestName.current = value;
            checkGuestInfoAbled();
          }}
        />
        <Margin height="20px" />
        <Typography font="semiBold20">전화번호</Typography>
        <Margin height="10px" />
        <Input
          size="big"
          type="tel"
          placeholder="Phone Number"
          onChange={({ target: { value } }) => {
            guestTel.current = value;
            checkGuestInfoAbled();
          }}
        />
      </form>
      <FixedCenterBox bottom="30px">
        <BottomButton
          type="submit"
          role="main"
          disabled={isButtonDisabled}
          onClick={() => {
            guestInfoBtnFun();
          }}
        >
          정보 입력 완료
        </BottomButton>
        <Margin height="10px" />
      </FixedCenterBox>
      <Margin height="100px" />
    </MobileLayout>
  );
};

export default GuestInfo;
