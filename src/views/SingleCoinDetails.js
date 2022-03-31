import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Typography, CircularProgress } from '@mui/material';

import { getSingleCoin } from '../agent';
import { Button } from '@mui/material';
import CoinChart from '../components/CoinChart';

//custom style
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderBottom: '2px solid grey',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Urbanist',
  },
  description: {
    fontSize: '1em',
    width: '100%',
    fontFamily: 'Urbanist',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify',
  },
  marketData: {
    textAlign: 'center',
    padding: 25,
    paddingTop: 10,
    width: '100%',
  },
  marketInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontFamily: 'Urbanist',
    color: '#34ee34',
  },
}));

const SingleCoinDetails = () => {
  const classes = useStyles();

  //get single coin url id
  const { id } = useParams();

  //set initial state
  const [coin, setCoin] = useState();
  const [readMore, setReadMore] = useState(false);

  //function for get single coin information
  const fetchCoin = async () => {
    const { data } = await axios.get(getSingleCoin(id));

    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function for fix the coin description parse error
  function showhtml(htmlString) {
    var html = { __html: htmlString };
    return <div dangerouslySetInnerHTML={html}></div>;
  }

  if (!coin) {
    return <CircularProgress color='success' />;
  } else {
    //destructure
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
        {/* coin details */}
        <div className={classes.information}>
          <img
            src={image.large}
            alt={name}
            height='60'
            style={{ marginBottom: 20 }}
          />
          <Typography variant='h3' className={classes.heading}>
            {name}
          </Typography>

          <div className={classes.marketData}>
            <div className={classes.marketInfo}>
              <Typography variant='h6' className={classes.heading}>
                Rank:{market_cap_rank}
              </Typography>
              <Typography variant='h6' className={classes.heading}>
                Category:{categories}
              </Typography>
              <Typography variant='h5' className={classes.heading}>
                ${market_data.current_price.aud.toLocaleString()}
              </Typography>
            </div>

            <Typography className={classes.description}>
              {/* conditional description display based on read more or show less button */}
              {readMore
                ? showhtml(description.en)
                : showhtml(`${description.en.substring(0, 200)} ......`)}
              <Button color='success' onClick={() => setReadMore(!readMore)}>
                {readMore ? 'show less' : '  read more'}
              </Button>
            </Typography>
          </div>
        </div>

        {/* line chart display*/}
        <CoinChart coin={coin} />
      </div>
    );
  }
};

export default SingleCoinDetails;
