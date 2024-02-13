//예약 요약 리스트 더미 데이터
const dummySummaryList = [
  {
    car: "1톤 포터(냉동)",
    status: "배정 중",
    datetime: "2024.1.10 12:10",
    cost: 17,
    id: 0
  },
  {
    car: "2.5톤 마이티(카고)",
    status: "운송 완료",
    datetime: "2024.1.1 10:10",
    cost: 25,
    id: 1
  }
];

export const dummySummary = (reservId = undefined) => {
  return reservId !== undefined ? dummySummaryList[reservId] : dummySummaryList;
};

//예약 상세 페이지 더미 데이터
const dummyDriverList = [
  {
    phase: "before",
    name: null,
    tel: null,
    picture: null
  },
  {
    phase: "reserv",
    name: "김포터",
    tel: "010-0000-0000",
    picture: null
  },
  {
    phase: "moving",
    name: "김포터",
    tel: "010-0000-0000",
    picture: null
  },
  {
    phase: "after",
    name: "김포터",
    tel: "010-0000-0000",
    picture: null
  }
];
const dummyCarList = [
  {
    type: "포터2",
    phase: "before",
    capacity: "1톤",
    volumn: "10 X 15 X 3 M",
    quantity: 1
  },
  {
    type: "마이티3",
    phase: "after",
    capacity: "2.5톤",
    volumn: "10 X 15 X 3 M",
    quantity: 2
  }
];
const dummyMapList = [
  {
    srcCoordinate: { lat: 37.4942643848404, lng: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dstCoordinate: { lat: 37.4466225962954, lng: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  },
  {
    srcCoordinate: { lat: 37.4942643848404, lng: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dstCoordinate: { lat: 37.4466225962954, lng: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  }
];

export const dummyDetail = reservId => {
  return {
    driver: dummyDriverList[reservId],
    car: dummyCarList[reservId],
    map: dummyMapList[reservId]
  };
};
