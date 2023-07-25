import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const tank = require('../assets/tank.png');
const googleWebStorePng = require('../assets/Google_Chrome_Web_Store_icon_2022.svg.png');
// import dashboard from '../images/dashboardnew.jpg';
// import setup from '../images/setuppage.jpg';
// import metrics from '../images/metrics.jpg';
// import helpdesk from '../images/helpdesk.gif';
// import lightmode from '../images/lightmode.gif';
// import helpdeskJPG from '../images/helpdesk.jpg';
// import lightmodeJPG from '../images/lightmode.jpg';
import { Typography } from '@mui/material';
import Tilt from 'react-parallax-tilt';
import { browserName } from 'react-device-detect';

const Features = () => {
  let tilt = true;

  if (browserName.includes('Safari')) {
    tilt = false;
    // helpdesk = helpdeskJPG;
    // lightmode = lightmodeJPG;
  }
  // console.log('browserName is', browserName);
  // console.log('browserVersion is', browserVersion);

  let dashboardImg = (
    <Tilt
      // tiltAngleYInitial='90'
      tiltEnable={tilt}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      tiltReverse={true}
      style={{
        marginLeft: '05%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '13',
      }}
    >
      <Box
        src={tank}
        component='img'
        className='image'
        sx={{
          width: '90%',
          mb: 6,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1301',
          border: '1px',
          borderRadius: '2%',
          bgcolor: 'black',
          boxShadow: '0px 0px 5px 5px rgb(0, 0, 0, 0.1)',
          ':hover': {
            boxShadow: '0px 0px 17px 17px rgb(255, 62, 0, 0.5)',
          },
        }}
      ></Box>
    </Tilt>
  );
  let setupImg = (
    <Tilt
      tiltEnable={tilt}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      tiltReverse={true}
      style={{
        marginRight: '2%',
        marginLeft: '3.5%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '13',
      }}
    >
      <Box
        src={tank}
        component='img'
        className='image2'
        sx={{
          width: '94%',
          mb: 6,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1301',
          border: '1px',
          borderRadius: '2%',
          bgcolor: 'black',
          boxShadow: '0px 0px 5px 5px rgb(0, 0, 0, 0.1)',
          ':hover': {
            boxShadow: '0px 0px 17px 17px rgb(255, 62, 0, 0.5)',
          },
        }}
      ></Box>
    </Tilt>
  );
  let metricsImg = (
    <Tilt
      tiltEnable={tilt}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      tiltReverse={true}
      transitionSpeed={800}
      style={{
        marginLeft: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '13',
      }}
    >
      <Box
        src={tank}
        component='img'
        className='image3'
        sx={{
          width: '90%',
          ml: 3,
          mb: 6,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1301',
          border: '1px',
          borderRadius: '2%',
          bgcolor: 'black',
          boxShadow: '0px 0px 5px 5px rgb(0, 0, 0, 0.1)',
          ':hover': {
            boxShadow: '0px 0px 17px 17px rgb(255, 62, 0, 0.5)',
          },
        }}
      ></Box>
    </Tilt>
  );
  let lightmodeImg = (
    <Tilt
      tiltEnable={tilt}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      tiltReverse={true}
      style={{
        marginRight: '2%',
        marginLeft: '3.5%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '13',
      }}
    >
      <Box
        src={tank}
        component='img'
        className='image5'
        sx={{
          width: '95%',
          mb: 6,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1301',
          border: '1px',
          borderRadius: '2%',
          bgcolor: 'black',
          boxShadow: '0px 0px 5px 5px rgb(0, 0, 0, 0.1)',
          ':hover': {
            boxShadow: '0px 0px 17px 17px rgb(255, 62, 0, 0.5)',
          },
        }}
      ></Box>
    </Tilt>
  );
  let helpdeskImg = (
    <Tilt
      // tiltAngleYInitial='90'
      tiltEnable={tilt}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      tiltReverse={true}
      style={{
        marginLeft: '05%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '13',
      }}
    >
      <Box
        src={tank}
        component='img'
        className='image4'
        sx={{
          width: '90%',
          mb: 6,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1301',
          border: '1px',
          borderRadius: '2%',
          bgcolor: 'black',
          boxShadow: '0px 0px 5px 5px rgb(0, 0, 0, 0.1)',
          ':hover': {
            boxShadow: '0px 0px 17px 17px rgb(255, 62, 0, 0.5)',
          },
        }}
      ></Box>
    </Tilt>
  );

  return (
    <Grid id='features'>
      <Box id='button container' width='100%'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            mb: 4,
          }}
        >
          <Box
            id='buttonsDL'
            component='img'
            src={googleWebStorePng}
            onClick={() =>
              window.open(
                'https://chrome.google.com/webstore/search/svelte?hl=en'
              )
            }
            sx={{
              width: '90px',
              height: '90px',
              paddingTop: '5px',
              zIndex: '130',
            }}
          ></Box>
        </Box>
      </Box>
      <Typography
        variant='h2'
        textAlign='center'
        sx={{
          fontFamily: 'outfit',
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: '1px',
          color: 'white',
          textDecoration: 'none',
          mt: 0,
          mb: 15,
          zIndex: '130',
          textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
        }}
      >
        FEATURING:
      </Typography>
      <div id='featuresDiv' style={{ marginLeft: '15px' }}>
        <Box
          id='feature1'
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            alignContent: 'center',
            marginBottom: 0,
            marginTop: '100',
            zIndex: '130',
            // bgcolor: 'red',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              zIndex: '130',
              marginRight: '5%',

              marginTop: '4.5%',
              // bgcolor: 'blue',
            }}
          >
            <Typography
              className='titles'
              variant='h4'
              sx={{
                fontFamily: 'outfit',
                fontWeight: '800',
                fontSize: '2vw',
                letterSpacing: '1px',
                color: 'white',
                textDecoration: 'none',

                textAlign: 'center',
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
              }}
            >
              USER-FRIENDLY INTERFACE
            </Typography>
            <Typography
              className='blurbs'
              variant='h5'
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 50,
                fontSize: '1.5vw',
                letterSpacing: '.1 rem',
                color: 'white',
                textDecoration: 'none',
                mt: 3,
                mb: 15,
                alignContent: 'center',

                textAlign: 'center',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Take command of the Tank and do BOOM BOOM BOOM BOOM Tank options,
              to do BOOM BOOM BOM BOOOM BOOOM to Enemies
              <br />
              <br />
              Clearly visualize your commands within our interactive interface,
              and take advantage of the improved readability.
            </Typography>
          </Box>
          {dashboardImg}
        </Box>
        <Box
          id='feature2'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignContent: 'center',
            marginBottom: 0,
            marginTop: '100px',
            zIndex: '130',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              alignText: 'center',
              zIndex: '130',
              marginLeft: '3%',
              marginTop: '4.2%',
              // bgcolor: 'blue',
            }}
          >
            <Typography
              className='titles2'
              variant='h4'
              sx={{
                fontFamily: 'outfit',
                fontWeight: '800',
                fontSize: '2vw',
                letterSpacing: '1px',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                alignItems: 'center',
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
              }}
            >
              QUICK Tank SETUP
            </Typography>
            <Typography
              className='blurbs2'
              variant='h5'
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 50,
                fontSize: '1.5vw',
                letterSpacing: '.1 rem',
                color: 'white',
                textDecoration: 'none',
                mt: 3,
                mb: 15,
                pr: 2,
                alignContent: 'center',
                textAlign: 'center',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Take command of the Tank and do BOOM BOOM BOOM BOOM Tank options,
              to do BOOM BOOM BOM BOOOM BOOOM to Enemies
              <br />
              <br />
              Generate a custom Tank file personalized to your projects' needs
              using a pre-configured template, allowing you to shorten tedious
              setup time and start working with your Tanks.
            </Typography>
          </Box>
          {setupImg}
        </Box>
        <Box
          id='feature3'
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            alignContent: 'center',
            marginBottom: 40,
            marginTop: '100px',
            zIndex: '130',
            // bgcolor: 'red',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              zIndex: '130',
              marginRight: '5%',

              marginTop: '6%',
              // bgcolor: 'blue',
            }}
          >
            <Typography
              className='titles3'
              variant='h4'
              sx={{
                fontFamily: 'outfit',
                fontWeight: '800',
                fontSize: '2vw',
                letterSpacing: '1px',
                color: 'white',
                textDecoration: 'none',
                alignItems: 'center',
                textAlign: 'center',
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
              }}
            >
              TANK VISUALIZATION
            </Typography>
            <Typography
              className='blurbs'
              variant='h5'
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 50,
                fontSize: '1.5vw',
                letterSpacing: '.1 rem',
                color: 'white',
                textDecoration: 'none',
                mt: 3,
                mb: 15,
                alignContent: 'center',

                textAlign: 'center',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Easily sync your Tank with other Tanks to allow for clear and
              real-time visualization of your Tanks' health.
              <br />
              <br />
              Utilize our quick set up if you are not already connected, and
              consider Tank your only stop for working with and monitoring your
              enemy Tanks.
            </Typography>
          </Box>
          {metricsImg}
        </Box>

        <Box
          id='feature4'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignContent: 'center',
            marginBottom: 0,
            marginTop: '80px',
            zIndex: '130',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              alignText: 'center',
              zIndex: '130',
              marginLeft: '3%',
              marginTop: '4.2%',
              // bgcolor: 'blue',
            }}
          >
            <Typography
              className='titles2'
              variant='h4'
              sx={{
                fontFamily: 'outfit',
                fontWeight: '800',
                fontSize: '2vw',
                letterSpacing: '1px',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                alignItems: 'center',
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
              }}
            >
              HELP & LEARNING RESOURCES
            </Typography>
            <Typography
              className='blurbs2'
              variant='h5'
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 50,
                fontSize: '1.5vw',
                letterSpacing: '.1 rem',
                color: 'white',
                textDecoration: 'none',
                mt: 3,
                mb: 15,
                pr: 2,
                alignContent: 'center',
                textAlign: 'center',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Tank can be difficult to learn, let alone master. So we've created
              special tools to aid those new to using the technology.
              <br />
              <br />
              Now you can get help information about any Tank or type at the
              click of a button with the Instant Help Desk, or you can follow
              tutorials and master Tanking with the Learning Center.
            </Typography>
          </Box>
          {helpdeskImg}
        </Box>

        <Box
          id='feature5'
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            alignContent: 'center',
            marginBottom: 0,
            marginTop: '100px',
            zIndex: '130',
            // bgcolor: 'red',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              zIndex: '130',
              marginRight: '5%',

              marginTop: '6%',
              // bgcolor: 'blue',
            }}
          >
            <Typography
              className='titles3'
              variant='h4'
              sx={{
                fontFamily: 'outfit',
                fontWeight: '800',
                fontSize: '2vw',
                letterSpacing: '1px',
                color: 'white',
                textDecoration: 'none',
                alignItems: 'center',
                textAlign: 'center',
                zIndex: '130',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
              }}
            >
              LIGHT MODE Tank / DARK MODE TAnk
            </Typography>
            <Typography
              className='blurbs'
              variant='h5'
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 50,
                fontSize: '1.5vw',
                letterSpacing: '.1 rem',
                color: 'white',
                textDecoration: 'none',
                mt: 3,
                mb: 15,
                alignContent: 'center',

                textAlign: 'center',
                textShadow: '1px 1px 5px rgb(0, 0, 0, 0.3)',
              }}
            >
              Whether it's eye strain, or just personal preference, we know
              engineers can be selective about their Tanks.
              <br />
              <br />
              So we created a Light/Dark Tank mode that allows you to work with
              your favorite color combination. Now you can focus on coding with
              no distractions to your workflow.
            </Typography>
          </Box>
          {lightmodeImg}
        </Box>
      </div>
    </Grid>
  );
};

export default Features;
