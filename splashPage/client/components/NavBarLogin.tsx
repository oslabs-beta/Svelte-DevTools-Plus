import React from 'react';
// import { Link } from 'react-scroll';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Input } from '@mui/material';
import Button from '@mui/material/Button';
const logo1 = require('../assets/logo.png');
const logo2 = require('../assets/DevTools.png');

// background: '#FF8C00',

const NavbarLogin: React.FC = () => {
  return (
    <Grid id="nav-bar">
      <Box>
        <AppBar
          style={{
            background: '#000000',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: '35000',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}
          >
            {/* Replace with your first logo */}
            {/* <img
              src={logo1}
              alt='Logo 1'
              style={{ width: '30px', marginRight: '10px' }}
            /> */}
            <span style={{ color: 'inherit', fontSize: '32px' }}>
              Svelte DevTools
            </span>
            {/* Replace with your second logo */}
            <img
              src={logo2}
              alt="Logo 2"
              style={{ width: '30px', marginLeft: '10px' }}
            />
          </Box>
          <Toolbar>
            <Button
              color="inherit"
              href="/"
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Home page
            </Button>
            <Button
              color="inherit"
              href="/signup"
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Signup
            </Button>
            <Button
              color="inherit"
              href="/login"
              style={{ fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
};

export default NavbarLogin;
