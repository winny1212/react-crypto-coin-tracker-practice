import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
// import the components
import Header from './components/Header';
import SingleCoinDetails from './views/SingleCoinDetails';
import Homepage from './views/Homepage';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#13161d ',
    color: '#ffffff',
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    //header and routes
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
