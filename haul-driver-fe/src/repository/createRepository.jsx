import { ErrorMessageMap } from "../data/GlobalVariable";
import { getAccessToken } from "../utils/localStorage";

const apiKey = import.meta.env.VITE_API_KEY;

export async function getDriverSummaryList({ page, sortBy = "default" }) {
  try {
    const response = await fetch(
      `${apiKey}/api/v1/orders?sort=${sortBy}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );
    const body = await response.json();
    if (body.status === 200) {
      const list = body.data.orderSearchDtos.map(orderSummaryInfo => {
        return {
          orderId: orderSummaryInfo.id,
          src: orderSummaryInfo.srcSimpleAddress,
          dst: orderSummaryInfo.dstSimpleAddress,
          time: orderSummaryInfo.transportDatetime,
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

export async function orderDetail({ orderId }) {
  try {
    const response = await fetch(`${apiKey}/api/v1/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
    const data = await response.json();
    if (data.status === 200)
      return {
        success: true,
        data
      };
    return { success: false, code: data.code };
  } catch (error) {
    console.error("OrderDetail error:", error);
    return { success: false, message: error.toString() };
  }
}

//오더 승인 API 연결함수
export async function orderApprove({ orderId }) {
  try {
    const response = await fetch(`${apiKey}/api/v1/orders/approve`, {
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
    console.error("Approve error:", error);
    return { success: false, message: error.toString() };
  }
}
