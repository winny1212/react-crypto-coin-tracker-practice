import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import { makeStyles, useTheme } from '@mui/styles';
import { Typography, CircularProgress } from '@mui/material';

import { getSingleCoin } from '../agent';
import { Button } from '@mui/material';
import CoinChart from '../components/CoinChart';

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
    fontFamily: 'Urbanist',
  },
  description: {
    width: '100%',
    fontFamily: 'Urbanist',
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

  function showhtml(htmlString) {
    var html = { __html: htmlString };
    return <div dangerouslySetInnerHTML={html}></div>;
  }
  // useEffect(() => {
  //   const { data } = async () => {
  //     await axios.get(getSingleCoin(id));

  //     setCoin(data);
  //   };
  // }, []);
  // console.log(coin);
  if (!coin) {
    return <CircularProgress color='success' />;
  } else {
    const {
      image,
      name,
      description,
      market_data,
      categories,
      market_cap_rank,
    } = coin;
    return (
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={image.large}
            alt={name}
            height='200'
            style={{ marginBottom: 20 }}
          />
          <Typography variant='h3' className={classes.heading}>
            {name}
          </Typography>

          <Typography variant='h5' className={classes.heading}>
            Current Price: ${market_data.current_price.aud.toLocaleString()}
          </Typography>
          <Typography variant='h5' className={classes.heading}>
            Rank:{market_cap_rank}
          </Typography>
          <Typography variant='h5' className={classes.heading}>
            Market cap: ${market_data.market_cap.aud.toLocaleString()}
          </Typography>
          <Typography variant='h5' className={classes.heading}>
            Category:{categories}
          </Typography>
          <Typography variant='subtitle1' className={classes.description}>
            {readMore
              ? showhtml(description.en)
              : showhtml(`${description.en.substring(0, 200)}...`)}
            <Button onClick={() => setReadMore(!readMore)}>
              {readMore ? 'show less' : '  read more'}
            </Button>
          </Typography>
        </div>
        <CoinChart coin={coin} />
      </div>
    );
  }
};

export default SingleCoinDetails;
