import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getSingleCoin } from '../agent';

const SingleCoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  // const fetchCoin = async () => {
  //   const { data } = await axios.get(getSingleCoin(id));

  //   setCoin(data);
  // };

  // useEffect(() => {
  //   fetchCoin();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log(coin);
  useEffect(() => {
    const { data } = async () => {
      await axios.get(getSingleCoin(id));

      setCoin(data);
    };
  }, []);
  console.log(coin);
  return <div>kdkaehlwfqlweqiuefhwlq</div>;
};

export default SingleCoinDetails;
