import React from 'react';
import { useHistory } from 'react-router-dom';
//API import from material-ui
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Grid, Toolbar, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

//custom styling
const useStyles = makeStyles(() => ({
  logo: {
    color: '#34ee34',
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

//search styling imported from material-ui + custom styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#34ee34',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

//component
const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar color='transparent' position='static'>
      <Toolbar>
        {/* coin desk link to the homepage */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography
              variant='h5'
              className={classes.logo}
              onClick={() => history.push(`/`)}
            >
              Coin Desk
            </Typography>
          </Grid>

          {/* search function*/}
          <Grid item xs={8}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search here…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
