import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Header from './components/Header';
import SingleCoinDetails from './pages/SingleCoinDetails';
import Homepage from './pages/Homepage';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    backgroundColor: 'rgb(228, 228, 235)',
    color: 'black',
  },
}));
const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <Switch>
        <Route path='/' component={Homepage} exact />
        <Route path='/coins/:id' component={SingleCoinDetails} exact />
      </Switch>
    </div>
  );
};

export default App;
