import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HistoricalData } from '../agent';
import { makeStyles } from '@mui/styles';
import {
  CircularProgress,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material';

import { Line } from 'react-chartjs-2';
import dateOfChart from '../dataDayOfChart';

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
    console.log(data);
    setHistoryData(data.prices);
  };

  useEffect(() => {
    fetchHistoryData();
  }, [days]);
  return (
    <div className={classes.container}>
      {!historyData ? (
        <CircularProgress color='success' />
      ) : (
        <>
          {/* {dateOfChart.map(()=>{})} */}
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            {dateOfChart.map((day) => {
              return (
                <Button
                  key={day.id}
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              );
            })}
          </ButtonGroup>
          <Line
            data={{
              labels: historyData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historyData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in usd`,
                  borderColor:
                    coin.price_change_percentage_24h > 0
                      ? '#008000'
                      : '#ff0000',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default CoinChart;
