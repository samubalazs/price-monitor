import { GET_TICKER_HISTORY, HISTORY_ERROR } from "./types";
import axios from "axios";

export const getTickerHistory = (details) => async (dispatch) => {
  const baseURL = "https://www.alphavantage.co/query?";
  const { timeSeries, securityTicker } = details;
  const timeFilter = `function=${timeSeries}`;
  const symbol = `symbol=${securityTicker}`;
  const interval =
    timeSeries === "TIME_SERIES_INTRADAY" ? "&interval=5min" : "";
  const apiKey = `apikey=TEASHDO9G1ZV6SG3`;
  const endPoint = baseURL + [timeFilter, symbol, interval, apiKey].join("&");
  try {
    const res = await axios.get(endPoint);

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
