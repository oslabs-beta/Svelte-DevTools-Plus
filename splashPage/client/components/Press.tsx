import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
const productHuntLogo = require('../assets/productHuntLogo.png');
const MediumLogo = require('../assets/MediumLogo.png');

const Press = () => {
  return (
    <div id='press' style={{ zIndex: '14009', paddingTop: '60px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '40000',
          marginTop: '90px',
        }}
      >
        <Typography
          variant='h2'
          textAlign='center'
          style={{
            zIndex: '34016',
          }}
          sx={{
            fontFamily: 'Hanken Grotesk',
            fontSize: '6.2vw',
            fontWeight: 600,
            letterSpacing: '1px',
            color: 'white',
            textDecoration: 'none',
            mt: 20,
            mb: 9,
            zIndex: '34016',
            textShadow: '1px 1px 5px rgb(0, 0, 0, 0.5)',
          }}
        >
          Read About Us
        </Typography>
        <Box
          id='pressimages'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '85%',
            mb: 20,
          }}
        >
          <Box
            id='MediumArticle'
            component='img'
            src={MediumLogo}
            onClick={() =>
              window.open('https://www.youtube.com/watch?v=nlYlNF30bVg')
            }
            sx={{
              width: '45%',
              zIndex: '3410',
              mb: '60px',
              // bgcolor:'red',
              ':hover': 'pointer',
            }}
          ></Box>
          <div style={{ width: '50px' }} />
          <Box
            id='ProductHuntArticle'
            component='img'
            src={productHuntLogo}
            onClick={() =>
              window.open('https://www.youtube.com/watch?v=nlYlNF30bVg')
            }
            sx={{
              width: '45%',

              zIndex: '3410',
              mb: '60px',
              // bgcolor:'red',
              ':hover': 'pointer',
            }}
          ></Box>
        </Box>
      </div>
    </div>
  );
};

export default Press;
