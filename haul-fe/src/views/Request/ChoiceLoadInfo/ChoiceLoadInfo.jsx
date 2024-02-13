import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationStore } from "../../../store/reservationStore.jsx";
import MobileLayout from "../../../components/MobileLayout/MobileLayout.jsx";
import Header from "../../../components/Header/Header.jsx";
import Margin from "../../../components/Margin/Margin.jsx";
import Typography_Span from "../../../components/Typhography/Typhography_Span.jsx";
import Typography from "../../../components/Typhography/Typhography.jsx";
import Input from "../../../components/Input/Input.jsx";
import Flex from "../../../components/Flex/Flex.jsx";
import styled from "styled-components";
import NavigationBar from "../../../components/NavigationBar/NavigationBar.jsx";
import BottomButton from "../../../components/Button/BottomButton.jsx";
import FixedCenterBox from "../../../components/FixedBox/FixedCenterBox.jsx";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";
import { isNumber, isPositiveNumber } from "../../../utils/helper.js";

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

const ChoiceLoadInfo = () => {
  const navigation = useNavigate();

  const {
    setRoadInfo,
    state: {
      dstAddress,
      cargoWeight,
      cargoWidth,
      cargoLength,
      cargoHeight,
      specialNotes
    },
    state,
  } = useContext(reservationStore);
  const [submitDisabled, CheckSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!dstAddress) {
      navigation(UrlMap.choiceDstPageUrl);
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

  function SumbitStore() {
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
        children: ErrorMessageMap.IsNotPositiveNumber,
      });
      return;
    }
    setRoadInfo({
      cargoWeight: Number(inCargoWeight.current),
      cargoWidth: Number(inCargoWidth.current),
      cargoLength: Number(inCargoLength.current),
      cargoHeight: Number(inCargoHeight.current),
      specialNotes: inSpecialNotes,
    });
    navigation(UrlMap.resultPageUrl);
  }

  return (
    <MobileLayout>
      <Header>
        HAUL
        <Typography_Span color="subColor">.</Typography_Span>
      </Header>
      <Margin height="24px" />
      <Typography font="bold20">
        <Typography_Span color="subColor">하울</Typography_Span>
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
      </Flex>

      <Margin height="10px" />
      <Flex kind="flexBetweenAlignCenter">
        <LoadInfoTypoBox>길이</LoadInfoTypoBox>
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
      </Flex>

      <Margin height="10px" />
      <Flex kind="flexBetweenAlignCenter">
        <LoadInfoTypoBox>높이</LoadInfoTypoBox>
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
