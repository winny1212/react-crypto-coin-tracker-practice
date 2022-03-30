import React from 'react';
import { useEffect, useState } from 'react';
import { HistoricalData } from '../agent';
import { Line } from 'react-chartjs-2';

const CoinChart = () => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalData(coin.id, days));
    // console.log(data);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);
  return <div></div>;
};

export default CoinChart;
