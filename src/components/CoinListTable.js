import React, { useState } from 'react';
import axios from 'axios';
import { CoinList } from '../agent';

const CoinListTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList);
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  return <div>Coinlist</div>;
};

export default CoinListTable;
