import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Switch,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core/";
import { getTickerHistory } from "../actions/monitorActions";
import CandlestickChart from "../components/chartComponent";
import TableChart from "../components/tableComponent";

const Monitor = () => {
  const initialSearchDetails = {
    securityTicker: "",
    timeSeries: "TIME_SERIES_MONTHLY",
  };

  const timeFrame = {
    TIME_SERIES_MONTHLY: "Monthly Time Series",
    TIME_SERIES_WEEKLY: "Weekly Time Series",
    TIME_SERIES_DAILY: "Time Series (Daily)",
    TIME_SERIES_INTRADAY: "Time Series (5min)",
  };

  const [searchDetails, setSearchDetails] = useState(initialSearchDetails);
  const [toggleView, setToggleView] = useState(false);
  const [hideMessage, setHideMessage] = useState(false);

  const dispatch = useDispatch();

  const { tickerData, error, errorMessage } = useSelector(
    (state) => state.result
  );

  const handleViewChange = () => {
    setToggleView(!toggleView);
  };

  const handleErrorMessage = () => {
    setHideMessage(!hideMessage);
    window.location.reload();
  };

  const handleSearchDetailsChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      if (name === "security-ticker") {
        setSearchDetails({
          ...searchDetails,
          securityTicker: value.toUpperCase(),
        });
      } else {
        setSearchDetails({
          ...searchDetails,
          [name]: value,
        });
      }
    }
  };

  const startSearch = () => {
    dispatch(getTickerHistory(searchDetails));
  };

  if (error)
    return (
      <div className={hideMessage ? "hide-message" : "error-message"}>
        {errorMessage}
        <Button
          color="default"
          className="close-icon"
          onClick={() => handleErrorMessage()}
        >
          X
        </Button>
      </div>
    );

  return (
    <div>
      <div className="search-input">
        <TextField
          name="security-ticker"
          label="Security Ticker"
          variant="outlined"
          onChange={handleSearchDetailsChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => startSearch()}
          disabled={!searchDetails.securityTicker}
        >
          Search
        </Button>
      </div>

      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="time-series"
          name="timeSeries"
          value={searchDetails.timeSeries}
          defaultValue="TIME_SERIES_MONTHLY"
          onChange={handleSearchDetailsChange}
        >
          <FormControlLabel
            value="TIME_SERIES_MONTHLY"
            control={<Radio color="primary" size="small" />}
            label="Monthly"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="TIME_SERIES_WEEKLY"
            control={<Radio color="primary" size="small" />}
            label="Weekly"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="TIME_SERIES_DAILY"
            control={<Radio color="primary" size="small" />}
            label="Daily"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="TIME_SERIES_INTRADAY"
            control={<Radio color="primary" size="small" />}
            label="Intraday"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>

      {!tickerData["Meta Data"] && (
        <div>
          <h3>How to use</h3>
          <p>- Please enter valid security ticker (e.g., AAPL, MSFT, etc.)</p>
          <p>- Select time period (e.g., AAPL, MSFT, etc.)</p>
          <p>- Click on Search button</p>
          <p>- Switch view to check result on chart/table</p>
        </div>
      )}

      <div className="stock-container">
        {tickerData["Meta Data"] && (
          <div className="toggle-input">
            Chart
            <Switch
              checked={toggleView}
              onChange={handleViewChange}
              color="default"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            Table
          </div>
        )}

        {toggleView ? (
          <TableChart
            searchResult={tickerData}
            timeSeries={timeFrame[searchDetails.timeSeries]}
          />
        ) : (
          <CandlestickChart
            searchResult={tickerData}
            timeSeries={timeFrame[searchDetails.timeSeries]}
          />
        )}
      </div>
    </div>
  );
};

export default Monitor;
