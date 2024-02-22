import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationStore } from "../../../store/reservationStore.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import TypographySpan from "../../../components/Typhography/TyphographySpan.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Input from "../../../components/Input/Input.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import styled from "styled-components";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import {
  UrlMap,
  ErrorMessageMap,
  TransportTypeArr
} from "../../../data/GlobalVariable.js";
import { isNumber, isPositiveNumber } from "../../../utils/helper.js";
import { getIsMember } from "../../../utils/localStorage.js";
import { memberReservationFun } from "../../../repository/reservationRepository.js";
import { isTokenInvalid } from "../../../repository/userRepository.js";
import Loading from "../../Loading/Loading.jsx";

const LoadInfoTypoBox = styled.div`
  width: 40px;
  height: auto;
  ${props => props.theme.font["bold16"]}
  text-align: left;
  padding-bottom: 2px;
`;

const SpecialBtnBox = styled.div`
  ${props => props.theme.flex.flexRow}
  flex-wrap: wrap;
  gap: 10px;
`;

const SmallBtn = styled.button`
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  background: ${props =>
    props.isClick ? props.theme.colors.subColor : props.theme.colors.inputGray};
  ${props => props.theme.font.bold12};
  color: ${props =>
    props.isClick ? props.theme.colors.white : props.theme.colors.grayText};
  width: fit-content;
  height: auto;
  padding: 14px 27px;
  text-align: center;
`;

const InputWrapper =styled.div`
  width: 87%;
`

const ChoiceLoadInfo = () => {
  const navigate = useNavigate();
  const [resultLoading, setResultLoading] = useState(false);

  const {
    setRoadInfo,
    getReservationState,
    state: {
      transportType,
      dstAddress,
      cargoWeight,
      cargoWidth,
      cargoLength,
      cargoHeight,
      specialNotes
    }
  } = useContext(reservationStore);
  const [submitDisabled, CheckSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!dstAddress) {
      //navigate(UrlMap.choiceDstPageUrl);
    }
    CheckSubmitDisabledFun();
  }, []);

  const [inSpecialNotes, setInSpecialNotes] = useState(specialNotes);

  const inCargoWeight = useRef(cargoWeight.toString());
  const inCargoWidth = useRef(cargoWidth.toString());
  const inCargoLength = useRef(cargoLength.toString());
  const inCargoHeight = useRef(cargoHeight.toString());

  //이 페이지에서 원하는 값이 다 있는지 체크
  function CheckSubmitDisabledFun() {
    inCargoWeight.current = inCargoWeight.current.trim();
    inCargoWidth.current = inCargoWidth.current.trim();
    inCargoLength.current = inCargoLength.current.trim();
    inCargoHeight.current = inCargoHeight.current.trim();

    const checkSubmitDisabled = !(
      inCargoWeight.current &&
      inCargoWidth.current &&
      inCargoLength.current &&
      inCargoHeight.current
    );
    if (submitDisabled !== checkSubmitDisabled) {
      CheckSubmitDisabled(checkSubmitDisabled);
    }
  }

  async function SumbitStore() {
    const cargoWeightNum = Number(inCargoWeight.current);
    const cargoWidthNum = Number(inCargoWidth.current);
    const cargoLengthNum = Number(inCargoLength.current);
    const cargoHeightNum = Number(inCargoHeight.current);

    if (
      !isNumber(inCargoWeight.current) ||
      !isNumber(inCargoWidth.current) ||
      !isNumber(inCargoLength.current) ||
      !isNumber(inCargoHeight.current)
    ) {
      ToastMaker({ type: "error", children: ErrorMessageMap.IsNotNumber });
      return;
    }
    if (
      !isPositiveNumber(inCargoWeight.current) ||
      !isPositiveNumber(inCargoWidth.current) ||
      !isPositiveNumber(inCargoLength.current) ||
      !isPositiveNumber(inCargoHeight.current)
    ) {
      ToastMaker({
        type: "error",
        children: ErrorMessageMap.IsNotPositiveNumber
      });
      return;
    }

    function checkWeightToTypeFun(checkTransportType, weight) {
      for (const transportInfo of TransportTypeArr) {
        if (transportInfo.transportType === checkTransportType) {
          if (weight > transportInfo.maxLoad * 1000) {
            return transportInfo.maxLoad;
          } else {
            return 0;
          }
        }
      }
      return 0;
    }

    const checkWeightToType = checkWeightToTypeFun(
      transportType,
      cargoWeightNum
    );
    //transportType에 대한 분류
    if (checkWeightToType > 0) {
      ToastMaker({
        type: "info",
        children: `현재 선택하신 운송종류는 ${checkWeightToType}톤까지 실으실 수 있습니다.`
      });
      return;
    }

    //최대 너비, 높이, 길이에 대한 분류
    if (
      cargoWidthNum > 1000 ||
      cargoLengthNum > 1000 ||
      cargoHeightNum > 1000
    ) {
      ToastMaker({
        type: "info",
        children: `Haul은 1000cm미만의 크기를 지원합니다.`
      });
      return;
    }

    setRoadInfo({
      cargoWeight: cargoWeightNum,
      cargoWidth: cargoWidthNum,
      cargoLength: cargoLengthNum,
      cargoHeight: cargoHeightNum,
      specialNotes: inSpecialNotes
    });

    const isMember = getIsMember();
    //비회원이라면 guestInfo 페이지로 이동
    if (isMember === "false") {
      navigate(UrlMap.guestInfoPageUrl);
      return;
    }
    const reservationState = getReservationState();
    // 회원이라면 바로 결과 페이지로 이동
    setResultLoading(true);
    const { success, data, code } = await memberReservationFun({
      ...reservationState,
      cargoWeight: cargoWeightNum,
      cargoWidth: cargoWidthNum,
      cargoLength: cargoLengthNum,
      cargoHeight: cargoHeightNum,
      specialNotes: inSpecialNotes
    });
    if (success) {
      navigate(UrlMap.resultPageUrl, { state: { data: data.data } });
    } else {
      if (isTokenInvalid(code)) navigate(UrlMap.loginUrl);
      if (code === 1104)
        ToastMaker({
          type: "error",
          children: ErrorMessageMap.NoMatchingHaulCarError
        });
      else
        ToastMaker({ type: "error", children: ErrorMessageMap.NetworkError });
    }
    setResultLoading(false);
  }

  if (resultLoading) return <Loading />;

  return (
    <MobileLayout>
      <Header>
        HAUL
        <TypographySpan color="subColor">.</TypographySpan>
      </Header>
      <Margin height="24px" />
      <Typography font="bold20">
        <TypographySpan color="subColor">하울</TypographySpan>
        에서 당신만을 위한 차를 <br />
        보내드리기 위해 몇가지만 물어볼게요!
      </Typography>
      <Margin height="30px" />
      <Typography font="bold16">
        1. 무게가 대략적으로 몇 Kg정도 되나요?
      </Typography>
      <Margin height="12px" />
      <Input
        size="small"
        placeholder="무게를 알려주세요"
        defaultValue={cargoWeight}
        onChange={({ target: { value } }) => {
          inCargoWeight.current = value;
          CheckSubmitDisabledFun();
        }}
        unit="kg"
        textAlign="right"
      />
      <Margin height="30px" />
      <Typography font="bold16">
        2. 짐 크기가 대략적으로 몇 cm 되나요?
      </Typography>
      <Margin height="20px" />
      <Flex kind="flexBetweenAlignCenter">
        <LoadInfoTypoBox>너비</LoadInfoTypoBox>
        <InputWrapper>
        <Input
          size="small"
          placeholder="짐의 너비를 알려주세요"
          defaultValue={cargoWidth}
          onChange={({ target: { value } }) => {
            inCargoWidth.current = value;
            CheckSubmitDisabledFun();
          }}
          unit="cm"
          textAlign="right"

        />
        </InputWrapper>
      </Flex>

      <Margin height="10px" />
      <Flex kind="flexBetweenAlignCenter">
        <LoadInfoTypoBox>길이</LoadInfoTypoBox>
        <InputWrapper>
        <Input
          size="small"
          placeholder="짐의 길이를 알려주세요"
          defaultValue={cargoLength}
          onChange={({ target: { value } }) => {
            inCargoLength.current = value;
            CheckSubmitDisabledFun();
          }}
          unit="cm"
          textAlign="right"
        />
        </InputWrapper>
      </Flex>

      <Margin height="10px" />
      <Flex kind="flexBetweenAlignCenter">
        <LoadInfoTypoBox>높이</LoadInfoTypoBox>
        <InputWrapper>
        <Input
          size="small"
          placeholder="짐의 높이를 알려주세요"
          defaultValue={cargoHeight}
          onChange={({ target: { value } }) => {
            inCargoHeight.current = value;
            CheckSubmitDisabledFun();
          }}
          unit="cm"
          textAlign="right"
        />
        </InputWrapper>
      </Flex>

      <Margin height="30px" />
      <Typography font="bold16">
        3. 짐에 어떤 특이사항이 있나요? (중복 선택 가능)
      </Typography>
      <Margin height="12px" />
      <SpecialBtnBox>
        {inSpecialNotes.map((specialNote, index) => (
          <SmallBtn
            key={index}
            isClick={specialNote.selected}
            onClick={() => {
              setInSpecialNotes(
                inSpecialNotes.map((note, noteIndex) => {
                  if (noteIndex !== index) return note;
                  return { ...note, selected: !note.selected };
                })
              );
            }}
          >
            {specialNote.note}
          </SmallBtn>
        ))}
      </SpecialBtnBox>
      <FixedCenterBox bottom="100px">
        <BottomButton
          role="main"
          disabled={submitDisabled}
          onClick={() => {
            SumbitStore();
          }}
        >
          선택 완료
        </BottomButton>
      </FixedCenterBox>
      <NavigationBar />
    </MobileLayout>
  );
};

export default ChoiceLoadInfo;
