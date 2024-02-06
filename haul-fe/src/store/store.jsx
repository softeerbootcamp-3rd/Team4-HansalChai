import { useReducer, createContext } from "react";

const initialState = {
  reservation: {
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
  },
};

const store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTransportType = (transportType) => {
    dispatch({ type: "SET_TRANSPORTTYPE", payload: { transportType } });
  };

  return (
    <store.Provider value={{ state, setTransportType }}>
      {children}
    </store.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSPORTTYPE":
      return {
        ...state,
        reservation: {
          ...state.reservation,
          transportType: action.payload.transportType,
        },
      };
    default:
      return state;
  }
};

export { store, StoreProvider };
