import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//import from material-ui
import {
  Grid,
  Container,
  TableCell,
  CircularProgress,
  Typography,
  Pagination,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
//get coin list API
import { getCoinList } from '../agent';
// context for global search value state management
import { useAppContext } from '../context/appContext';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },

  tableHead: {
    backgroundColor: '#34ee34',
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Urbanist',
  },
  title: {
    color: '#34ee34',
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    padding: '0.8em',
    cursor: 'pointer',
  },
  coin: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#baf0ba',
    },
    fontFamily: 'Montserrat',
  },
  coinSymbol: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  coinName: {
    display: 'flex',
    flexDirection: 'column',
  },
  pagination: {
    padding: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      color: '#34ee34',
    },
  },
}));

const CoinListTable = () => {
  const classes = useStyles();
  const history = useHistory();

  //set initial state
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  //destruction initial search value from context
  const { search } = useAppContext();

  //search function
  const handleSearch = () => {
    console.log(coins);
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  //function for get coin list from API:
  //if the search value is empty, get all coins,
  //if the search value exist, get the relative coins matched with the search value
  useEffect(() => {
    if (search === '') {
      axios
        .get(getCoinList)
        .then((res) => {
          setLoading(false);
          setCoins(res.data);
        })
        .catch((error) => console.error('Error'));
    } else {
      const searchValue = handleSearch();
      setCoins(searchValue);
    }
  }, [search]);

  return (
    <Container style={{ textAlign: 'center' }}>
      <Grid>
        <Typography variant='h4' className={classes.title}>
          Cryptocurrency Prices by Market Cap
        </Typography>
      </Grid>

      {/* table import from material-ui */}
      <Grid>
        <TableContainer component={Paper} className={classes.table}>
          {loading ? (
            <CircularProgress color='success' />
          ) : (
            <Table aria-label='simple table'>
              {/* table head */}
              <TableHead className={classes.tableHead}>
                <TableRow>
                  {['Coin', 'Price ($)', '24h', 'Mkt Cap ($)'].map((head) => (
                    <TableCell
                      style={{}}
                      key={head}
                      align={head === 'Coin' ? 'left' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* table body */}
              <TableBody>
                {coins
                  .slice((page - 1) * 8, (page - 1) * 10 + 10)
                  .map((coin) => {
                    const { id, image, current_price, name, total_volume } =
                      coin;
                    const rate = coin.price_change_percentage_24h;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${id}`)}
                        className={classes.coin}
                        key={name}
                      >
                        {/* coin image,name and icon */}
                        <TableCell
                          component='th'
                          scope='coin'
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img
                            src={image}
                            alt={name}
                            height='40'
                            style={{ marginBottom: 5 }}
                          />
                          <div className={classes.coinName}>
                            <span className={classes.coinSymbol}>
                              {coin.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>
                              {coin.name}
                            </span>
                          </div>
                        </TableCell>

                        {/* coin price */}
                        <TableCell align='right'>
                          {current_price.toFixed(2)}
                        </TableCell>

                        {/* coin rate */}
                        <TableCell
                          align='right'
                          style={{
                            color: rate > 0 ? '#008000' : '#ff0000',
                            fontWeight: 500,
                          }}
                        >
                          {rate > 0 ? '+' : ''}
                          {rate.toFixed(2)}%
                        </TableCell>

                        {/* coin market cap */}
                        <TableCell align='right'>
                          {total_volume.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Grid>

      {/* pagination */}
      <Grid className={classes.pagination}>
        {/* 10 coins are displayed each page */}
        <Pagination
          count={parseInt((coins.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 300);
          }}
        />
      </Grid>
    </Container>
  );
};

export default CoinListTable;
