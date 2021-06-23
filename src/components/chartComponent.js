import { Chart } from "react-google-charts";

const CandlestickChart = (data) => {
  const buildChartData = (object) => {
    let result = [
      [
        {
          type: "string",
          id: "Date",
        },
        {
          type: "number",
          label: "Open",
        },
        {
          type: "number",
          label: "High",
        },
        {
          type: "number",
          label: "Low",
        },
        {
          type: "number",
          label: "Close",
        },
      ],
    ];
    for (const property in object) {
      const date =
        data.timeSeries === "Time Series (5min)"
          ? property.split(" ").pop().slice(0, 5)
          : property;
      const open = object[property]["1. open"];
      const high = object[property]["2. high"];
      const low = object[property]["3. low"];
      const close = object[property]["4. close"];
      result.push([date, low, open, close, high]);
    }
    return result.slice(0, 30);
  };

  const buildMetaData = () => {
    const metaSource = data.searchResult["Meta Data"];
    const information = metaSource["1. Information"];
    const symbol = metaSource["2. Symbol"];
    const lastRefreshed = metaSource["3. Last Refreshed"];
    return [information, symbol, lastRefreshed];
  };

  return (
    <div>
      {data.searchResult[data.timeSeries] && (
        <Chart
          width={1100}
          height={350}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={buildChartData(data.searchResult[data.timeSeries])}
          options={{
            legend: "none",
            animation: {
              startup: true,
              easing: "linear",
              duration: 1000,
            },
            title: buildMetaData()[0],
          }}
          rootProps={{ "data-testid": "1" }}
        />
      )}

      {data.searchResult["Meta Data"] && (
        <p>
          Symbol: {buildMetaData()[1]}, Last Refreshed: {buildMetaData()[2]}
        </p>
      )}
    </div>
  );
};

export default CandlestickChart;
