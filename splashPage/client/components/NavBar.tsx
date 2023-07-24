import React from 'react';
// import { Link } from 'react-scroll';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

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

const Navbar: React.FC = () => {
  return (
    <Grid id='nav-bar'>
      <Box>
        <AppBar
          style={{
            background: '#FF8C00',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            zIndex: '35000',
          }}
        >
          <Toolbar>
            <Button
              color='inherit'
              onClick={scrollDownload}
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#FFA500',
                  color: '#FF6600',
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
                  backgroundColor: '#FFA500',
                  color: '#FF6600',
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
                  backgroundColor: '#FFA500',
                  color: '#FF6600',
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
                  backgroundColor: '#FFA500',
                  color: '#FF6600',
                },
              }}
            >
              Team
            </Button>
            <Button
              color='inherit'
              href='https://github.com/oslabs-beta/kaptn'
              target='_blank'
              style={{ marginRight: '20px', fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#FFA500',
                  color: '#FF6600',
                },
              }}
            >
              Github
            </Button>
            <Button
              color='inherit'
              style={{ fontSize: '18px' }}
              sx={{
                ':hover': {
                  backgroundColor: '#FFA500',
                  color: '#FF6600',
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

// <nav>
//   <ul>
//     <li>
//       <Link to='section1' smooth={true} duration={500}>
//         Home
//       </Link>
//     </li>
//     <li>
//       <Link to='section2' smooth={true} duration={500}>
//         Features
//       </Link>
//     </li>
//     <li>
//       <Link to='section3' smooth={true} duration={500}>
//         Press
//       </Link>
//     </li>
//     <li>
//       <Link to='section4' smooth={true} duration={500}>
//         Team
//       </Link>
//     </li>
//     <li>
//       <Link to='section5' smooth={true} duration={500}>
//         Github
//       </Link>
//     </li>
//     <li>
//       <Link to='section6' smooth={true} duration={500}>
//         Extension
//       </Link>
//     </li>
//     {/* Add more sections as needed */}
//   </ul>
// </nav>
