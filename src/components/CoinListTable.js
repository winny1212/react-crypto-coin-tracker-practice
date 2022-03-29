import React, { useState } from 'react';
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

const CoinListTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList);
    console.log(data);

    setCoins(data);
    setLoading(false);
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
                    align={head === 'Coin' ? '' : 'right'}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        )}
      </TableContainer>
    </Grid>
  );
};

export default CoinListTable;
