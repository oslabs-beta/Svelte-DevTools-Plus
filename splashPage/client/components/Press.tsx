import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
const productHuntLogo = require('../assets/productHuntLogo.png');
const MediumLogo = require('../assets/MediumLogo.png');

const Press = () => {
  return (
    <div id='press' style={{ zIndex: '14009', paddingTop: '60px' }}>
      <div style={{ zIndex: '30001', marginTop: '40px' }}>
        <Typography
          variant='h2'
          textAlign='center'
          style={{
            zIndex: '34012',
          }}
          sx={{
            fontFamily: 'Outfit',
            fontSize: '6.5vw',
            fontWeight: 600,
            letterSpacing: '1px',
            color: 'white',
            textDecoration: 'none',
            mt: 20,
            mb: 9,
            zIndex: '34011',
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
            width: '95%',
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
