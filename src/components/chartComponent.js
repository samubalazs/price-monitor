import { Chart } from "react-google-charts";

const CandlestickChart = () => {
  return (
    <div>
      <Chart
        width={"100%"}
        height={350}
        chartType="CandlestickChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["day", "low", "open", "close", "high"],
          ["Mon", 20, 28, 38, 45],
          ["Tue", 31, 38, 55, 66],
          ["Wed", 50, 55, 77, 80],
          ["Thu", 77, 77, 66, 50],
          ["Fri", 68, 66, 22, 15],
        ]}
        options={{
          legend: "none",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default CandlestickChart;
