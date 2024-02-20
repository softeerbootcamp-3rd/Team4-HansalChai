import { getAccessToken } from "../utils/localStorage";
const apiKey = import.meta.env.VITE_API_KEY;

export async function memberReservationFun({
  transportType,
  reservationDate,
  reservationTime,
  srcName,
  srcAddress,
  srcCoordinate,
  srcDetailAddress,
  srcTel,
  dstName,
  dstAddress,
  dstCoordinate,
  dstDetailAddress,
  dstTel,
  cargoWeight,
  cargoWidth,
  cargoLength,
  cargoHeight,
  specialNotes
}) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({
        transportType: transportType,
        date: reservationDate,
        time: reservationTime,
        src: {
          name: srcName,
          address: srcAddress,
          detailAddress: srcDetailAddress,
          latitude: srcCoordinate.srcLatitude,
          longitude: srcCoordinate.srcLongitude,
          tel: srcTel
        },
        dst: {
          name: dstName,
          address: dstAddress,
          detailAddress: dstDetailAddress,
          latitude: dstCoordinate.dstLatitude,
          longitude: dstCoordinate.dstLongitude,
          tel: dstTel
        },
        cargo: {
          width: cargoWidth,
          length: cargoLength,
          height: cargoHeight,
          weight: cargoWeight
        },
        cargoOption: {
          refrigerated: specialNotes[0].selected,
          frozen: specialNotes[1].selected,
          furniture: specialNotes[2].selected,
          liftRequired: specialNotes[3].selected
        }
      })
    });

    const data = await response.json();
    if (data.status === 200) {
      return {
        success: true,
        data
      };
    } else {
      return { success: false, code: data.code };
    }
  } catch (error) {
    console.error("Reservation failed error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function memberReservationConfirmFun({ reservationId }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/reservations/${reservationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      return {
        success: true,
        data
      };
    } else {
      return { success: false, code: data.code };
    }
  } catch (error) {
    console.error("Member Confirm failed error:", error);
    return { success: false, message: error.toString() };
  }
}

export async function guestReservationFun({
  transportType,
  reservationDate,
  reservationTime,
  srcName,
  srcAddress,
  srcCoordinate,
  srcDetailAddress,
  srcTel,
  dstName,
  dstAddress,
  dstCoordinate,
  dstDetailAddress,
  dstTel,
  cargoWeight,
  cargoWidth,
  cargoLength,
  cargoHeight,
  specialNotes,
  guestName,
  guestTel
}) {
  try {
    const response = await fetch(`http://${apiKey}/api/v1/reservations/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transportType: transportType,
        date: reservationDate,
        time: reservationTime,
        src: {
          name: srcName,
          address: srcAddress,
          detailAddress: srcDetailAddress,
          latitude: srcCoordinate.srcLatitude,
          longitude: srcCoordinate.srcLongitude,
          tel: srcTel
        },
        dst: {
          name: dstName,
          address: dstAddress,
          detailAddress: dstDetailAddress,
          latitude: dstCoordinate.dstLatitude,
          longitude: dstCoordinate.dstLongitude,
          tel: dstTel
        },
        cargo: {
          width: cargoWidth,
          length: cargoLength,
          height: cargoHeight,
          weight: cargoWeight
        },
        cargoOption: {
          refrigerated: specialNotes[0].selected,
          frozen: specialNotes[1].selected,
          furniture: specialNotes[2].selected,
          liftRequired: specialNotes[3].selected
        },
        userInfo: {
          name: guestName,
          tel: guestTel
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data
      };
    } else {
      return { success: false, message: "Reservation failed" };
    }
  } catch (error) {
    console.error("Reservation failed:", error);
    return { success: false, message: error.toString() };
  }
}

export async function guestReservationConfirmFun({ reservationId }) {
  try {
    const response = await fetch(
      `http://${apiKey}/api/v1/reservations/guest/${reservationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data
      };
    } else {
      return { success: false, message: "Guest Confirm failed" };
    }
  } catch (error) {
    console.error("Guest Confirm failed error:", error);
    return { success: false, message: error.toString() };
  }
}
