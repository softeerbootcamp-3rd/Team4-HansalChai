import { getAccessToken } from "../utils/localStorage";
const apiKey = import.meta.env.VITE_API_KEY;

const dummyPlanData = [
  {
    id: 0,
    status: "before",
    src: "학동역",
    dst: "교대역",
    datetime: "2024.3.3 12:12:12",
    cost: "10000"
  },
  {
    id: 1,
    status: "moving",
    src: "학동역",
    dst: "교대역",
    datetime: "2024.3.3 12:12:12",
    cost: "5000"
  },
  {
    id: 2,
    status: "after",
    src: "학동역",
    dst: "교대역",
    datetime: "2024.3.3 12:12:12",
    cost: "1"
  }
];

const dummyCustomerList = [
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

const dummyMapList = [
  {
    src: { latitude: 37.4942643848404, longitude: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dst: { latitude: 37.4466225962954, longitude: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  },
  {
    src: { latitude: 37.4942643848404, longitude: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dst: { latitude: 37.4466225962954, longitude: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  },
  {
    src: { latitude: 37.4942643848404, longitude: 127.028259839376 },
    srcAddress: "서울특별시 강남구 강남대로 지하396 ",
    srcName: "강남구 애니타워",
    dst: { latitude: 37.4466225962954, longitude: 126.65387634549 },
    dstAddress: "부산광역시 금정구 부산대학로63번길 2",
    dstName: "부산대학교",
    fee: "15",
    time: "04"
  }
];

const dummyDetailData = id => {
  return {
    customer: dummyCustomerList[id],
    src: dummyMapList[id].src,
    dst: dummyMapList[id].dst,
    cost: dummyMapList[id].fee,
    requiredTime: dummyMapList[id].time,
    phase: "before"
  };
};

export async function getUserSummaryList({ page, sortBy }) {
  try {
    return {
      success: true,
      data: {
        lastPage: false,
        reservationInfoDTOS: [
          ...dummyPlanData,
          ...dummyPlanData,
          ...dummyPlanData,
          dummyPlanData[0]
        ]
      }
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getUserReservationDetails({ checkID }) {
  try {
    return { success: true, data: { ...dummyDetailData(checkID) } };
  } catch (error) {
    console.error(error);
  }
}

// 운송 상태 변경
export async function orderStatusChage({ orderId }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/orders/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({ id: orderId })
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data
      };
    } else {
      return { success: false, message: "OrderStatusChage failed" };
    }
  } catch (error) {
    console.error("OrderStatusChage error:", error);
    return { success: false, message: error.toString() };
  }
}
