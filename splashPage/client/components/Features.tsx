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
import '../../index.scss';

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
        alt='Screenshot of Svelte DevTools+ displaying a visual component hierarchy in a step-like or tree-like structure'
        component='img'
        className='image'
        sx={{
          width: '800px',
          mb: 6,
          mr: 8,
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
        alt="Screenshot of Svelte DevTools+ displaying real-time changes in a component's state and props"
        component='img'
        className='image2'
        sx={{
          width: '800px',
          mb: 6,
          ml: 1,
          mr: 5,
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
        alt="Screenshot of Svelte DevTools+ displaying a visual component tree, inspecting component's props, states and context"
        component='img'
        className='image3'
        sx={{
          width: '800px',
          mb: 6,
          mr: 8,
          ml: 5,
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
        alt="Screenshot of a time-travel debugging feature to inspect the application's state at different points in time and analyze state changes"
        component='img'
        className='image5'
        sx={{
          width: '800px',
          mb: 6,
          msLineBreak: 8,
          mr: 10,
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
        alt='Screenshot of modifying the state and props of a selected component directly from Svelte DevTools+ for testing and debugging'
        component='img'
        className='image4'
        sx={{
          width: '800px',
          mb: 6,
          ml: 8,
          mr: 10,
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
            alt='Google Chrome Web Store icon'
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
              cursor: 'pointer',
            }}
          ></Box>
        </Box>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '40000',
          marginTop: '80px',
        }}
      >
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
            mb: 10,
            zIndex: '130',
            textShadow: '1px 1px 5px rgb(0, 0, 0, 0.4)',
          }}
        >
          FEATURING:
        </Typography>
      </div>
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
              DYNAMIC COMPONENT VISUALIZATION
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
              Svelte DevTools+ allows developers to inspect the component
              hierarchy of a Svelte application in either a step-like or
              tree-like structure
              <br></br>
              <br></br>
              Our DevTool provides a visual representation of how components are
              nested inside each other, making it easier to understand the
              application's structure
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
              REAL-TIME STATE AND PROPS UPDATES
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
              Svelte DevTools+ allows developers to see the real-time changes in
              a component's state and props, immediately reflecting updates in
              the DevTool and allowing for simple tracking of the application's
              behavior
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
              COMPONENT INSPECTION
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
              When selecting a component in the DevTools component tree,
              developers can inspect the component's props, state, and context
              to aid in understanding the data and values that are passed to
              each component
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
              COMPONENT STATE MODIFICATION
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
              Developers can modify the state and props of a selected component
              directly from the DevTools for testing and debugging purposes
              <br></br>
              <br></br>
              This can be helpful in experimenting with different scenarios
              without modifying the actual code
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
              STATE REWIND
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
              Svelte DevTools+ provides a time-travel debugging feature that
              enables developers to inspect the application's state at different
              points in time and anlayze how the state of the application
              changes
            </Typography>
          </Box>
          {lightmodeImg}
        </Box>
      </div>
    </Grid>
  );
};

export default Features;
