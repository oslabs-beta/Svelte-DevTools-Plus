import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import linkedInPng from '../images/linkedin.png';
// import githubPng from '../images/gh.png';
// import natalie from '../images/natalie.png';
// import yining from '../images/yining.png';
// import olivia from '../images/olivia.png';
// import john from '../images/john.png';
// import brecht from '../images/brecht.png';
const tank = require('../assets/tank.png');
const linkedInPng = require('../assets/linkedIn.svg');
const githubPng = require('../assets/github.svg');

const styles = {
  icons: {
    width: '40px',
    height: '40px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '80px',
    zIndex: '1310',
  },
};

const Contributor = () => {
  return (
    <div
      id='teamTopDiv'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '40000',
      }}
    >
      <div
        id='TeamBio'
        style={{
          zIndex: '14001',
          // width: '800px',
          // height:"auto",
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h2'
          textAlign='center'
          style={{
            zIndex: '13006',
          }}
          sx={{
            fontFamily: 'outfit',
            fontSize: '6.2vw',
            fontWeight: 600,
            letterSpacing: '1px',
            color: 'white',
            textDecoration: 'none',
            mt: 10,
            mb: 9,
            textShadow: '1px 1px 5px rgb(0, 0, 0, 0.5)',
          }}
        >
          Meet Our Engineering Team
        </Typography>
        <Box
          id='members'
          justifyContent='center'
          alignContent='center'
          style={{ zIndex: '1301' }}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            mb: 10,
            zIndex: '130',
          }}
        >
          <Box textAlign='center' className='teammates' width='500px'>
            <Box
              component='img'
              src={tank}
              style={{ width: '250px', height: '250px', zIndex: '1300' }}
            ></Box>
            <Typography
              variant='h2'
              color='whitesmoke'
              mb='5px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Janice
            </Typography>
            <Typography
              variant='h5'
              fontWeight='lighter'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Software Engineer
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                zIndex: '130',
              }}
            >
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open(
                    'https://www.linkedin.com/in/brecht-horn-a9b839213/'
                  );
                }}
                style={styles.icons}
                src={linkedInPng}
                sx={{ ':hover': { width: '10px' } }}
              ></Box>
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.github.com/brecht-horn');
                }}
                style={styles.icons}
                src={githubPng}
              ></Box>
            </Box>
          </Box>
          <Box id='johnWidth' textAlign='center' width='500px'>
            <Box
              component='img'
              src={tank}
              style={{ width: '250px', height: '250px', zIndex: '130' }}
            ></Box>
            <Typography
              variant='h2'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Laura
            </Typography>
            <Typography
              variant='h6'
              fontWeight='lighter'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Software Engineer
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open(
                    'https://www.linkedin.com/in/hwi-won-choi-057081191/'
                  );
                }}
                style={styles.icons}
                src={linkedInPng}
              ></Box>
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.github.com/jhwiwoc');
                }}
                style={styles.icons}
                src={githubPng}
              ></Box>
            </Box>
          </Box>
          <Box textAlign='center' width='500px'>
            <Box
              component='img'
              src={tank}
              style={{ width: '250px', height: '250px' }}
            ></Box>
            <Typography
              variant='h2'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Maciej
            </Typography>
            <Typography
              variant='h5'
              fontWeight='lighter'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Software Engineer
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.linkedin.com/in/natalie-cordoves');
                }}
                style={styles.icons}
                src={linkedInPng}
              ></Box>
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.github.com/ncordoves');
                }}
                style={styles.icons}
                src={githubPng}
              ></Box>
            </Box>
          </Box>
          <Box textAlign='center' width='500px'>
            <Box
              component='img'
              src={tank}
              style={{ width: '250px', height: '250px' }}
            ></Box>
            <Typography
              variant='h2'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Francis
            </Typography>
            <Typography
              variant='h5'
              fontWeight='lighter'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Software Engineer
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.linkedin.com/in/olivia-hodel/');
                }}
                style={styles.icons}
                src={linkedInPng}
              ></Box>
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.github.com/ohodel');
                }}
                style={styles.icons}
                src={githubPng}
              ></Box>
            </Box>
          </Box>
          <Box textAlign='center' width='500px'>
            <Box
              component='img'
              src={tank}
              style={{ width: '250px', height: '250px' }}
            ></Box>
            <Typography
              variant='h2'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Alex
            </Typography>
            <Typography
              variant='h5'
              fontWeight='lighter'
              color='whitesmoke'
              mb='15px'
              // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
            >
              Software Engineer
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open(
                    'https://www.linkedin.com/in/yining-wang-83b896108/'
                  );
                }}
                style={styles.icons}
                src={linkedInPng}
              ></Box>
              <Box
                id='link'
                component='img'
                onClick={() => {
                  window.open('https://www.github.com/yiningcw');
                }}
                style={styles.icons}
                src={githubPng}
              ></Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Contributor;
