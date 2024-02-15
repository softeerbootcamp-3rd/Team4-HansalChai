import 일반용달 from "../assets/svgs/일반용달.svg";
import 용달이사 from "../assets/svgs/용달이사.svg";
import 미니용달 from "../assets/svgs/미니용달.svg";
import 비즈니스운송 from "../assets/svgs/비즈니스운송.svg";

export const MaxDeviceWidth = "400px";

export const UrlMap = {
  loginPageUrl: "/login",
  guestLoginPageUrl: "/guestLogin",
  signUpPageUrl: "/signup",
  choiceTranportTypeUrl: "/request/type",
  choiceDatePageUrl: "/request/date",
  choiceTimePageUrl: "/request/time",
  choiceSrcPageUrl: "/request/source",
  choiceDstPageUrl: "/request/destination",
  choiceLoadInfoPageUrl: "/request/loadInfo",
  choicePaymentPageUrl: "/request/purchase",
  guestInfoPageUrl: "/request/guestInfo",
  resultPageUrl: "/request/result",
  completePageUrl: "/request/complete",
  morePageUrl: "/more/list",
  checkReservationPageUrl: "/check/list",
  checkReservationDetailPageUrl: "/check/detail",
  checkReservationGuestPageUrl: "/check/guest"
};

export const CompanyCallNumber = "01096914119";

export const ErrorMessageMap = {
  InvalidTelformat: "전화번호 형식이 아닙니다.",
  InvalidEmailformat: "이메일 형식이 아닙니다.",
  NotSamePassword: "비밀번호가 일치하지 않습니다.",
  IsNotNumber: "숫자만 입력 가능합니다.",
  IsNotPositiveNumber: "0 이하는 입력 불가능합니다.",
  IsNotMinPasswordCount: "8자리 이상의 비밀번호만 가능합니다."
};

export const TransportTypeArr = [
  {
    transportType: "일반 용달",
    transportPlusInfo: "중고거래, 물품 운송",
    maxLoad: 10,
    boxEachColor: "#d9c7e7",
    img: 일반용달
  },
  {
    transportType: "용달 이사",
    transportPlusInfo: "원룸이사, 1인 가구 이사",
    maxLoad: 5,
    boxEachColor: "#FF9A62",
    img: 용달이사
  },
  {
    transportType: "미니 용달",
    transportPlusInfo: "소규모 운송, 물품 3개 이하",
    maxLoad: 1,
    boxEachColor: "#F6D776",
    img: 미니용달
  },
  {
    transportType: "비즈니스 운송",
    transportPlusInfo: "거래처 납부, 기업 운송",
    maxLoad: 100,
    boxEachColor: "#85C7EE",
    img: 비즈니스운송
  }
];
