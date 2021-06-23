import { Chart } from "react-google-charts";

const TableChart = (data) => {
  const buildChartData = (object) => {
    let result = [
      [
        { type: "string", label: "Date/Time" },
        { type: "number", label: "Low" },
        { type: "number", label: "Open" },
        { type: "number", label: "Close" },
        { type: "number", label: "High" },
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
      {data.searchResult["Meta Data"] && (
        <p>
          Symbol: {buildMetaData()[1]}, Last Refreshed: {buildMetaData()[2]}
        </p>
      )}

      {data.searchResult[data.timeSeries] && (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="Table"
          loader={<div>Loading Chart</div>}
          data={buildChartData(data.searchResult[data.timeSeries])}
          options={{
            showRowNumber: false,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </div>
  );
};

export default TableChart;
