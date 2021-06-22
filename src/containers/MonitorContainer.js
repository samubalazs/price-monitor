import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Switch,
  FormControl,
  FormLabel,
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

  const [searchDetails, setSearchDetails] = useState(initialSearchDetails);
  const [toggleView, setToggleView] = useState(true);

  const dispatch = useDispatch();

  const { tickerData, loading, error } = useSelector((state) => state.result);

  useEffect(() => {
    setTimeout(() => {
      //dispatch(getTickerHistory());
    }, 1000);
  }, []);

  const handleViewChange = () => {
    setToggleView(!toggleView);
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
    console.log(searchDetails);
  };

  const saveContent = () => {
    console.log(searchDetails);
    dispatch(getTickerHistory(searchDetails));
  };

  return (
    <div>
      <TextField
        name="security-ticker"
        label="Security Ticker"
        variant="outlined"
        onChange={handleSearchDetailsChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => saveContent()}
        disabled={!searchDetails.securityTicker}
      >
        Search
      </Button>
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
            control={<Radio color="primary" />}
            label="Monthly"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="TIME_SERIES_WEEKLY"
            control={<Radio color="primary" />}
            label="Weekly"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="TIME_SERIES_DAILY"
            control={<Radio color="primary" />}
            label="Daily"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="TIME_SERIES_INTRADAY"
            control={<Radio color="primary" />}
            label="Intraday"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
      Chart
      <Switch
        checked={toggleView}
        onChange={handleViewChange}
        color="default"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      Table
      {toggleView ? <CandlestickChart /> : <TableChart />}
    </div>
  );
};

export default Monitor;
