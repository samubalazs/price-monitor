import { GET_TICKER_HISTORY, HISTORY_ERROR } from "../actions/types";

const initialState = {
  tickerData: [],
  error: false,
  errorMessage: "",
};
const monitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKER_HISTORY:
      return {
        ...state,
        tickerData: action.payload,
      };
    case HISTORY_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default monitorReducer;
