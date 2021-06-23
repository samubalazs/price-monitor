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
      const date = property;
      const open = object[property]["1. open"];
      const high = object[property]["2. high"];
      const low = object[property]["3. low"];
      const close = object[property]["4. close"];
      result.push([date, open, high, low, close]);
    }
    return result;
  };

  const buildMetaData = () => {
    const metaSource = data.searchResult["Meta Data"];
    const information = metaSource["1. Information"];
    const symbol = metaSource["2. Symbol"];
    const lastRefreshed = metaSource["3. Last Refreshed"];
    const timeZone = metaSource["4. Time Zone"];
    return [information, symbol, lastRefreshed, timeZone];
  };

  return (
    <div>
      {data.searchResult["Meta Data"] && (
        <p>
          Information: {buildMetaData()[0]}
          <br />
          Symbol: {buildMetaData()[1]}, Last Refreshed: {buildMetaData()[2]},
          Time Zone: {buildMetaData()[3]}
        </p>
      )}

      {data.searchResult[data.timeSeries] && (
        <Chart
          width={"100%"}
          height={350}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={buildChartData(data.searchResult[data.timeSeries])}
          options={{
            legend: "none",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </div>
  );
};

export default CandlestickChart;
