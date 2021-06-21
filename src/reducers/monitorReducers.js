import { GET_TICKER_HISTORY, HISTORY_ERROR } from "../actions/types";

const initialState = {
  tickerData: [],
  loading: true,
  error: false,
};
const monitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKER_HISTORY:
      return {
        ...state,
        tickerData: action.payload,
        loading: false,
      };
    case HISTORY_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default monitorReducer;
