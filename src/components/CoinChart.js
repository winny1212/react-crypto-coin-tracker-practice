import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HistoricalData } from '../agent';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Typography } from '@mui/material';

import { Line } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
  },
}));

const CoinChart = ({ coin }) => {
  console.log(coin);
  const classes = useStyles();

  const [historyData, setHistoryData] = useState();
  const [days, setDays] = useState(1);
  //   console.log(coin.id);
  const fetchHistoryData = async () => {
    const { data } = await axios.get(HistoricalData(coin.id, days));

    setHistoryData(data.prices);
  };

  useEffect(() => {
    fetchHistoryData();
  }, [days]);
  return (
    <div className={classes.container}>
      {!historyData ? <CircularProgress color='success' /> : <></>}
    </div>
  );
};

export default CoinChart;
