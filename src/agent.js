//get coin list API
export const getCoinList =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=80&page=1&sparkline=false';

//get single coin API
export const getSingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

//get coin's historical API
export const HistoricalData = (id, days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
