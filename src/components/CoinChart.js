import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
//material-ui
import { makeStyles } from '@mui/styles';
import { CircularProgress, ButtonGroup, Button } from '@mui/material';
//Line chart
import { Line } from 'react-chartjs-2';
//API
import { HistoricalData } from '../agent';
import dateOfChart from '../dataDayOfChart';

//custome styling
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
  const classes = useStyles();

  //initial state
  const [historyData, setHistoryData] = useState();
  const [days, setDays] = useState(1);

  //get historical data
  const fetchHistoryData = async () => {
    const { data } = await axios.get(HistoricalData(coin.id, days));
    setHistoryData(data.prices);
  };

  useEffect(() => {
    fetchHistoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    //   if history data is not exist, return loading icon, or return the chart
    <div className={classes.container}>
      {!historyData ? (
        <CircularProgress color='success' />
      ) : (
        <>
          {/* date period button group */}
          <ButtonGroup
            variant='outlined'
            color='success'
            sx={{ my: '2' }}
            size='small'
            aria-label='outlined button group'
          >
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
          {/* history data display chart : import from react-chartjs */}
          <Line
            data={{
              //time/date display on x-axis
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
                  // price display on y-axis
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
