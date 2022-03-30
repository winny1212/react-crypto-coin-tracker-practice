import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import { makeStyles, useTheme } from '@mui/styles';
import { Typography } from '@mui/material';

import { getSingleCoin } from '../agent';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // },
  },
  sidebar: {
    width: '30%',
    // [theme.breakpoints.down('md')]: {
    //   width: '100%',
    // },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    // fontFamily: 'Montserrat',
  },
  description: {
    width: '100%',
    // fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
}));

const SingleCoinDetails = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const [readMore, setReadMore] = useState(false);

  const fetchCoin = async () => {
    const { data } = await axios.get(getSingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);
  console.log(coin);
  // useEffect(() => {
  //   const { data } = async () => {
  //     await axios.get(getSingleCoin(id));

  //     setCoin(data);
  //   };
  // }, []);
  // console.log(coin);
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {readMore
            ? coin?.description.en
            : `${coin?.description.en.substring(0, 200)}...`}
          <Button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default SingleCoinDetails;
