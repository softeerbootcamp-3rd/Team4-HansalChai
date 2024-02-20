import ToastMaker from "../components/Toast/ToastMaker";
import { ErrorMessageMap } from "../data/GlobalVariable";
import { getAccessToken } from "../utils/localStorage";
const apiKey = import.meta.env.VITE_API_KEY;

//code 1103 예약 정보 없음
export async function getGuestSummaryList({ reservationSerial }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/reservations/guest?number=${reservationSerial}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const body = await response.json();
    if (response.ok) {
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
    ToastMaker({ type: "error", children: ErrorMessageMap.TryLater });
    return { success: false, message: error.toString() };
  }
}

//code 1101 사용자 없음
//code 2001 헤더에 토큰이 없음
//code 2002 토큰 유효성 검증 실패
//code 2003 토큰이 만료됨
export async function getUserSummaryList({ page }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/reservations?keyword=${"운송 전"}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );
    console.log(response);

    const body = await response.json();
    console.log(body);
    if (response.ok) {
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
    ToastMaker({ type: "error", children: ErrorMessageMap.TryLater });
    return { success: false, message: error.toString() };
  }
}

//Question: 비회원 상세 조회 API로 회원 것에 접근하면? 그 반대는?
//code 1103 예약 정보 없음
export async function getGuestReservationDetails({ reservationID }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/reservations/guest/${reservationID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const body = await response.json();
    if (response.ok) {
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
    ToastMaker({ type: "error", children: ErrorMessageMap.TryLater });
    return { success: false, message: error.toString() };
  }
}

//code 1002 리소스 접근 권한 없음
//code 1103 예약 정보 없음
//code 2001 헤더에 토큰이 없음 - 로그아웃
//code 2002 토큰 유효성 검증 실패 - 로그아웃
//code 2003 토큰이 만료됨 - 로그아웃
export async function getUserReservationDetails({ reservationID }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/reservations/${reservationID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );

    const body = await response.json();
    if (response.ok) {
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
    ToastMaker({ type: "error", children: ErrorMessageMap.TryLater });
    return { success: false, code: 0, message: error.toString() };
  }
}
