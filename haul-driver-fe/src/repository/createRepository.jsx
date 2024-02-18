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
