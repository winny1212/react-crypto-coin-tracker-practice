import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  createTheme,
  ThemeProvider,
  Typography,
  TextField,
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

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid style={{ textAlign: 'center' }}>
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: 'Montserrat' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label='Search For a Crypto Currency..'
          variant='outlined'
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default CoinListTable;
