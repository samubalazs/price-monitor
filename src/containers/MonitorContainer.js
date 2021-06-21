import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core/";
import { getTickerHistory } from "../actions/monitorActions";

const Monitor = () => {
  const { tickerData, loading, error } = useSelector((state) => state.result);
  console.log(loading);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTickerHistory());
    }, 1000);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="error-message">Error!</div>;

  return (
    <div>
      <Button variant="contained">Default</Button>
      <pre>{JSON.stringify(tickerData, null, 2)}</pre>
    </div>
  );
};

export default Monitor;
