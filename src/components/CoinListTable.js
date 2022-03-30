import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//import from material-ui
import {
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
import { ArrowDropUpIcon, ArrowDropDownIcon } from '@mui/icons-material';
//get coin list API
import { getCoinList } from '../agent';
import { useAppContext } from '../context/appContext';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
  table: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
  },
  tableHead: {
    backgroundColor: '#34ee34',
  },
  title: {
    color: '#34ee34',
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    padding: '0.8em',
    cursor: 'pointer',
  },
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
  },
}));

const CoinListTable = () => {
  const classes = useStyles();
  const history = useHistory();

  //set initial state
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState('');
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
  //function for get coin list from API
  useEffect(() => {
    if (search === '') {
      axios
        .get(getCoinList)
        .then((res) => {
          setLoading(false);
          setCoins(res.data);
          // console.log(res.data);
        })
        .catch((error) => console.error('Error'));
    } else {
      const ss = handleSearch();
      setCoins(ss);
      console.log(ss);
    }
  }, [search]);

  return (
    <Container style={{ textAlign: 'center' }}>
      <Typography variant='h4' className={classes.title}>
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TableContainer component={Paper} className={classes.table}>
        {loading ? (
          <CircularProgress color='success' />
        ) : (
          // table import from material-ui
          <Table aria-label='simple table'>
            {/* head */}
            <TableHead className={classes.tableHead}>
              <TableRow>
                {['Coin', 'Price ($)', '24h', 'Mkt Cap ($)'].map((head) => (
                  <TableCell
                    style={{
                      color: 'black',
                      fontWeight: '700',
                      fontFamily: 'Urbanist',
                    }}
                    key={head}
                    align={head === 'Coin' ? '' : 'right'}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* body */}
            <TableBody>
              {coins.slice((page - 1) * 8, (page - 1) * 10 + 10).map((coin) => {
                const rate = coin.price_change_percentage_24h;
                return (
                  <TableRow
                    onClick={() => history.push(`/coins/${coin.id}`)}
                    className={classes.coin}
                    key={coin.name}
                  >
                    {/* coin name and icon */}
                    <TableCell
                      component='th'
                      scope='coin'
                      style={{
                        display: 'flex',
                        gap: 15,
                      }}
                    >
                      <img
                        src={coin?.image}
                        alt={coin.name}
                        height='50'
                        style={{ marginBottom: 10 }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontSize: 22,
                          }}
                        >
                          {coin.symbol}
                        </span>
                        <span style={{ color: 'darkgrey' }}>{coin.name}</span>
                      </div>
                    </TableCell>

                    {/* coin price */}
                    <TableCell align='right'>
                      {console.log(coin.current_price)}
                      {coin.current_price.toFixed(2)}
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
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    {/* coin market cap */}
                    <TableCell align='right'>
                      {coin.total_volume.toLocaleString()}M
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* pagination */}
      <Pagination
        count={(coins.length / 10).toFixed(0)}
        style={{
          backgroundColor: 'white',
          padding: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        // classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 300);
        }}
      />
    </Container>
  );
};

export default CoinListTable;
