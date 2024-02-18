import { getAccessToken } from "../utils/localStorage";

const apiKey = import.meta.env.VITE_API_KEY;

const dummyPlanData = [
  {
    id: 0,
    status: "before",
    src: "학동역",
    dst: "교대역",
    time: "12:12:12:12:12",
    fee: "10000"
  },
  {
    id: 1,
    status: "moving",
    src: "학동역",
    dst: "교대역",
    time: "12:12:12:12:12",
    fee: "5000"
  },
  {
    id: 2,
    status: "after",
    src: "학동역",
    dst: "교대역",
    time: "12:12:12:12:12",
    fee: "1"
  }
];

export async function getDriverDummySummaryList({ page, sortBy }) {
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

export async function getDriverSummaryList({ page, sortBy = "default" }) {
  try {
    const response = await fetch(
      `http://43.201.240.238:8080/api/v1/orders?sort=${sortBy}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
    if (!response.ok) {
      return { success: false, message: "정보를 불러오지 못했어요." };
    }
    const body = await response.json();
    const list = body.data.orderSearchDtos.map(v => {
      return {
        orderId: v.id,
        src: v.srcSimpleAddress,
        dst: v.dstSimpleAddress,
        time: v.transportDatetime,
        cost: v.cost
      };
    });
    return {
      success: true,
      data: {
        list,
        lastPage: body.data.lastPage
      }
    };
  } catch (error) {
    return { success: false, error, message: "정보를 불러오지 못했어요." };
  }
}

export async function getUserReservationDetails({ planID }) {
  try {
    return { success: true, data: dummyPlanData[0] };
  } catch (error) {
    console.error(error);
  }
}

//오더 승인 API 연결함수
export async function orderApprove({ orderId }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/orders/approve`, {
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
      return { success: false, message: "Approve failed" };
    }
  } catch (error) {
    console.error("Approve error:", error);
    return { success: false, message: error.toString() };
  }
}
