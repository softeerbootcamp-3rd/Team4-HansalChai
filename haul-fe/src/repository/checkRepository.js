import { ErrorMessageMap } from "../data/GlobalVariable";
import { getAccessToken } from "../utils/localStorage";
const apiKey = import.meta.env.VITE_API_KEY;

export async function getGuestSummaryList({ reservationSerial }) {
  try {
    const response = await fetch(
      `${apiKey}/api/v1/reservations/guest?number=${reservationSerial}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const body = await response.json();
    if (body.code === 200) {
      return {
        success: true,
        data: body.data
      };
    } else {
      return {
        success: false,
        code: body.code,
        message: ErrorMessageMap.ReservationNotFound
      };
    }
  } catch (error) {
    console.error("Get Guest Reservation Summary error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function getUserSummaryList({ page, keyword = "매칭 중" }) {
  try {
    const response = await fetch(
      `${apiKey}/api/v1/reservations?keyword=${keyword}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );

    const body = await response.json();
    if (body.code === 200) {
      return {
        success: true,
        data: body.data
      };
    } else {
      return {
        success: false,
        code: body.code,
        message: ErrorMessageMap.ReservationNotFound
      };
    }
  } catch (error) {
    console.error("Get User Reservation Summary error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function getGuestReservationDetails({ reservationID }) {
  try {
    const response = await fetch(
      `${apiKey}/api/v1/reservations/guest/${reservationID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const body = await response.json();
    if (body.code === 200) {
      return {
        success: true,
        data: body.data
      };
    } else {
      return {
        success: false,
        code: body.code,
        message: ErrorMessageMap.ReservationNotFound
      };
    }
  } catch (error) {
    console.error("Get Guest Reservation Detail error:", error);
    throw {
      success: false,
      code: 0,
      message: ErrorMessageMap.UnknownError,
      error
    };
  }
}

export async function getUserReservationDetails({ reservationID }) {
  try {
    const response = await fetch(
      `${apiKey}/api/v1/reservations/${reservationID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );

    const body = await response.json();
    if (body.code === 200) {
      return {
        success: true,
        data: body.data
      };
    } else {
      return {
        success: false,
        code: body.code,
        message: ErrorMessageMap.ReservationNotFound
      };
    }
  } catch (error) {
    console.error("Get User Reservation Detail error:", error);
    throw {
      success: false,
      code: 0,
      message: ErrorMessageMap.UnknownError,
      error
    };
  }
}
