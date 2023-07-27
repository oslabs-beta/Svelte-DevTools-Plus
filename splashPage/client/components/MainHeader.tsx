import React from 'react';
import { Grid, Typography } from '@mui/material';
// const logo = require('../assets/1200px-Svelte_Logo.svg.png');
// const logo1 = require('../assets/DevTools.png');
const logo = require('../assets/svelte-devtool-logo (2).png');
// const logo1 = require('../assets/svelte-devtool-logo (3).png');
import Box from '@mui/material/Box';

const MainHeader = () => {
  return (
    <Grid id='header'>
      <Box
        // disableEqualOverflow='true'
        style={{
          // backgroundColor: '#120838',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          width: '100%',
          height: '100%',
          marginTop: 10,
        }}
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'center',
            width: '65%',
          }}
        >
          <Box
            id='logo'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              src={logo}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                height: '300px',
                width: '300px',
                zIndex: '130',
                padding: '4rem',
              }}
              component='img'
            ></Box>
          </Box>
          <Box
            id='download'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h2'
              style={{ textShadow: '2px 2px 10px rgb(0, 0, 0, 0.5)' }}
              sx={{
                fontFamily: 'Outfit',
                fontSize: 85,
                fontWeight: 'normal',
                letterSpacing: '0px',
                color: '#f5f5f5',
                textDecoration: 'none',
                mb: 3,
                zIndex: '130',
              }}
            >
              Svelte DevTools+
            </Typography>
            <Typography
              variant='h4'
              align='center'
              sx={{
                fontFamily: 'inherit',
                fontWeight: 50,
                fontSize: '1.8rem',
                letterSpacing: '.1 rem',
                color: '#f5f5f5',
                textDecoration: 'none',
                mt: 1,
                mb: 2,
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Unlock the full power of the Svelte with Svelte DevTools+
            </Typography>
            <Typography
              variant='h4'
              align='center'
              sx={{
                fontFamily: 'Outfit',
                fontSize: '24px',
                letterSpacing: '.1 rem',
                color: '#ff5e00',
                textDecoration: 'none',
                mt: 1,
                mb: 1,
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Go to extension store
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default MainHeader;
