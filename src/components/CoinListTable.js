import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import axios from 'axios';
import {
  Grid,
  TableCell,
  CircularProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@mui/material';
import { CoinList } from '../agent';

const useStyles = makeStyles((theme) => ({
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
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(CoinList)
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.error('Error'));
  }, []);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Grid style={{ textAlign: 'center' }}>
      <Typography variant='h4' style={{ margin: 18 }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label='Search For a Crypto Currency..'
        variant='outlined'
        style={{ marginBottom: 20, width: '100%' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress color='success' />
        ) : (
          <Table aria-label='simple table'>
            <TableHead style={{ backgroundColor: '#cbcbcf' }}>
              <TableRow>
                {['Coin', 'Price', '24h', 'Mkt Cap'].map((head) => (
                  <TableCell
                    style={{
                      color: 'black',
                      fontWeight: '700',
                      fontFamily: 'Urbanist',
                    }}
                    key={head}
                    // align={head === 'Coin' ? '' : 'right'}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {coins.map((coin) => {
                const rate = coin.price_change_percentage_24h;
                return (
                  <TableRow
                    onClick={() => history.push(`/coins/${coin.id}`)}
                    className={classes.coin}
                    key={coin.name}
                  >
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
                    <TableCell align='right'>
                      {coin.current_price.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align='right'
                      style={{
                        color: rate > 0 ? '#008000' : '#ff0000',
                        fontWeight: 500,
                      }}
                    >
                      {rate && '+'}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
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
    </Grid>
  );
};

export default CoinListTable;
