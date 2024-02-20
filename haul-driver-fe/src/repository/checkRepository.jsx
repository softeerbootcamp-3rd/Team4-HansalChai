import { ErrorMessageMap } from "../data/GlobalVariable";
import { getAccessToken } from "../utils/localStorage";

const apiKey = import.meta.env.VITE_API_KEY;

export async function getDriverSummaryList({ page, keyword = "운송 전" }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/orders/mine?keyword=${keyword}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );
    const body = await response.json();
    if (body.status === 200) {
      const list = body.data.orderInfoDTOS.map(orderSummaryInfo => {
        return {
          orderId: orderSummaryInfo.id,
          src: orderSummaryInfo.src,
          dst: orderSummaryInfo.dst,
          time: orderSummaryInfo.datetime,
          cost: orderSummaryInfo.cost
        };
      });
      return {
        success: true,
        data: {
          list,
          lastPage: body.data.lastPage
        }
      };
    } else {
      switch (body.code) {
        case 1003:
          return {
            success: false,
            code: body.code,
            message: ErrorMessageMap.NotAllowedQuery
          };
        default:
          return {
            success: false,
            code: body.code,
            message: ErrorMessageMap.UnknownError
          };
      }
    }
  } catch (error) {
    return {
      success: false,
      error,
      code: 0,
      message: ErrorMessageMap.UnknownError
    };
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
    const data = await response.json();
    if (data.status === 200)
      return {
        success: true,
        data
      };
    return { success: false, code: data.code };
  } catch (error) {
    console.error("OrderStatusChage error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function checkOrderDetail({ orderId }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/orders/mine/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );
    const data = await response.json();
    if (data.status === 200)
      return {
        success: true,
        data
      };
    return { success: false, code: data.code };
  } catch (error) {
    console.error("CheckOrderDetail error:", error);
    return { success: false, message: error.toString() };
  }
}
