import { GET_TICKER_HISTORY, HISTORY_ERROR } from "./types";
import axios from "axios";

export const getTickerHistory = () => async (dispatch) => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);

    dispatch({
      type: GET_TICKER_HISTORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: HISTORY_ERROR,
      payload: console.log(e),
    });
  }
};
