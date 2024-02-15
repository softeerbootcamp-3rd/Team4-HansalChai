import ToastMaker from "../components/Toast/ToastMaker";
import { getAccessToken } from "../utils/localStorage";
const apiKey = import.meta.env.VITE_API_KEY;

export async function getGuestSummaryList({ reservationSerial }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/reservations/guest?number=${reservationSerial}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      const body = await response.json();
      return {
        success: true,
        data: body.data
      };
    } else {
      return { success: false, message: "예약 정보를 찾을 수 없었어요" };
    }
  } catch (error) {
    console.error("Get Guest Reservation Summary error:", error);
    ToastMaker({ type: "error", children: "잠시 후 다시 시도해주세요" });
    return { success: false, message: error.toString() };
  }
}

export async function getUserSummaryList({ page }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/reservations?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAccessToken()}`,
          "mode": "cors"
        }
      }
    );

    console.log(response);

    if (response.ok) {
      const body = await response.json();
      return {
        success: true,
        data: body.data
      };
    } else {
      return { success: false, message: "예약 정보를 찾을 수 없었어요" };
    }
  } catch (error) {
    console.error("Get User Reservation Summary error:", error);
    ToastMaker({ type: "error", children: "잠시 후 다시 시도해주세요" });
    return { success: false, message: error.toString() };
  }
}

export async function getGuestReservationDetails({ reservationID }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/reservations/guest/${reservationID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response);

    if (response.ok) {
      const body = await response.json();
      return {
        success: true,
        data: body.data
      };
    } else {
      return { success: false, message: "예약 정보를 찾을 수 없었어요" };
    }
  } catch (error) {
    console.error("Get Guest Reservation Detail error:", error);
    ToastMaker({ type: "error", children: "잠시 후 다시 시도해주세요" });
    return { success: false, message: error.toString() };
  }
}

export async function getUserReservationDetails({ reservationID }) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/reservations/${reservationID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAccessToken()}`
        }
      }
    );

    console.log(response);

    if (response.ok) {
      const body = await response.json();
      return {
        success: true,
        data: body.data
      };
    } else {
      return { success: false, message: "예약 정보를 찾을 수 없었어요" };
    }
  } catch (error) {
    console.error("Get User Reservation Detail error:", error);
    ToastMaker({ type: "error", children: "잠시 후 다시 시도해주세요" });
    return { success: false, message: error.toString() };
  }
}
