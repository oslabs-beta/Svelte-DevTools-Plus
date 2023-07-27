import React from 'react';
// import { Link } from 'react-scroll';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Input } from '@mui/material';
import Button from '@mui/material/Button';
const logo1 = require('../assets/logo.png');
const logo2 = require('../assets/DevTools.png');

const scrollTeam = () => {
  const section = document.querySelector('#TeamBio');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollFeat = () => {
  const section = document.querySelector('#features');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollDownload = () => {
  const section = document.querySelector('#logo');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollPress = () => {
  const section = document.querySelector('#press');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// background: '#FF8C00',

const Navbar: React.FC = () => {
  return (
    <Grid id='nav-bar'>
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
              Svelte DevTools+
            </span>
            {/* Replace with your second logo */}
            {/* <img
              src={logo2}
              alt='Logo 2'
              style={{ width: '30px', marginLeft: '10px' }}
            /> */}
          </Box>
          <Toolbar>
            <Button
              color='inherit'
              onClick={scrollDownload}
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Extension
            </Button>

            <Button
              color='inherit'
              onClick={scrollFeat}
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Features
            </Button>

            <Button
              color='inherit'
              onClick={scrollPress}
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Press
            </Button>

            <Button
              color='inherit'
              onClick={scrollTeam}
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Team
            </Button>
            <Button
              color='inherit'
              href='https://github.com/oslabs-beta/Svelte-DevTools-Plus'
              target='_blank'
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#ff5e00',
                  color: 'white',
                },
              }}
            >
              Github
            </Button>
            <Button
              color='inherit'
              href='/login'
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

export default Navbar;