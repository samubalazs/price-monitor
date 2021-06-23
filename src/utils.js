export const buildMetaData = (metaSource) => {
  const information = metaSource["1. Information"];
  const symbol = metaSource["2. Symbol"];
  const lastRefreshed = metaSource["3. Last Refreshed"];
  const timeZone = metaSource["4. Time Zone"];
  return [information, symbol, lastRefreshed, timeZone];
};
