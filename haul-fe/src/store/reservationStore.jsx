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

  const setInitialState = () => {
    dispatch({ type: "SET_INITIAL_STATE" });
  };

  const setTransportType = (transportType) => {
    dispatch({ type: "SET_TRANSPORT_TYPE", payload: { transportType } });
  };

  const setReservationDate = (reservationDate) => {
    dispatch({ type: "SET_RESERVATION_DATE", payload: { reservationDate } });
  };

  const setReservationTime = (reservationTime) => {
    dispatch({ type: "SET_RESERVATION_TIME", payload: { reservationTime } });
  };

  const setSrcInfo = ({srcName, srcLatitude,srcLongitude, srcDetailAddress, srcTel}) => {
    console.log(srcName, srcLatitude,srcLongitude, srcDetailAddress, srcTel);
    dispatch({ type: "SET_SRC_INFO", payload: { srcName, srcLatitude,srcLongitude, srcDetailAddress, srcTel } });
  };

  return (
    <reservationStore.Provider
      value={{
        state,
        setInitialState,
        setTransportType,
        setReservationDate,
        setReservationTime,
        setSrcInfo
      }}
    >
      {children}
    </reservationStore.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return {
        ...initialState,
      };
    case "SET_TRANSPORT_TYPE":
      return {
        ...state,
        transportType: action.payload.transportType,
      };
    case "SET_RESERVATION_DATE":
      return {
        ...state,
        reservationDate: action.payload.reservationDate,
      };
    case "SET_RESERVATION_TIME":
      return {
        ...state,
        reservationTime: action.payload.reservationTime,
      };
    case "SET_SRC_INFO":
      return {
        ...state,
        srcName: action.payload.srcName,
        srcCoordinate: { srcLatitude: action.payload.srcLatitude, srcLongitude: action.payload.srcLongitude },
        srcDetailAddress: action.payload.srcDetailAddress,
        srcTel: action.payload.srcTel,
      };
    default:
      return state;
  }
};

export { reservationStore, ReservationStoreProvider };
