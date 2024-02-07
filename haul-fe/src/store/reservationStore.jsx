import { useReducer, createContext } from "react";

const initialState = {
  transportType: "",
  reservationDate: "",
  reservationTime: "",
  srcName: "",
  srcCoordinate: { srcLatitude: "", srcLongitude: "" },
  srcDetailAddress: "",
  srcTel: "",
  dstName: "",
  dstCoordinate: { dstLatitude: "", dstLongitude: "" },
  dstDetailAddress: "",
  dstTel: "",
  cargoWeight: "",
  cargoWidth: "",
  cargoLength: "",
  cargoHeight: "",
};

const reservationStore = createContext(initialState);

const ReservationStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTransportType = (transportType) => {
    dispatch({ type: "SET_TRANSPORTTYPE", payload: { transportType } });
  };

  const setReservationDate = (reservationDate) => {
    dispatch({ type: "SET_RESERVATIONDATE", payload: { reservationDate } });
  };

  return (
    <reservationStore.Provider
      value={{ state, setTransportType, setReservationDate }}
    >
      {children}
    </reservationStore.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSPORTTYPE":
      return {
        ...state,
        transportType: action.payload.transportType,
      };
    case "SET_RESERVATIONDATE":
      return {
        ...state,
        reservationDate: action.payload.reservationDate,
      };
    default:
      return state;
  }
};

export { reservationStore, ReservationStoreProvider };
