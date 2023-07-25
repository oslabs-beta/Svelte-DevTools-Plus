import React from 'react';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
const tank = require('../assets/tank.png');
const linkedInPng = require('../assets/linkedIn.svg');
const githubPng = require('../assets/github.svg');
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  icons: {
    width: '40px',
    height: '40px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '30px',
    marginTop: '10px',
    zIndex: '1310',
    display: 'flex',
  },
};

type PersonObj = {
  id: number;
  firstname: string;
  lastname: string;
  github: string;
  linkedin: string;
  photo: string;
};

const Contributor = () => {
  //////////////////////////////////////////////////////
  ////////Getting Contributors from Database////////////
  //////////////////////////////////////////////////////

  const [teamates, setTeamates] = useState([]);

  const team = async () => {
    let people = await fetch('http://localhost:3000/contributors', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await people.json();
    console.log(response, 'response contributors');
    setTeamates(response);
  };

  useEffect(() => {
    team();
  }, []);

  //////////////////////////////////////////////////////
  ////////////Creating contributors cards///////////////
  //////////////////////////////////////////////////////

  const teamatesInSvelte: JSX.Element[] = teamates.map((person: PersonObj) => {
    return (
      <Box
        id='contributor'
        textAlign='center'
        className='teammates'
        width='250px'
        style={{
          background:
            'linear-gradient(150deg, #ffffff47, #f5dede70, rgba(254, 123, 145, 0.32))',
          borderRadius: '16px',
          boxShadow: '0 4px 30px #0000001a',
          backdropFilter: 'blur(7.9px)',
          WebkitBackdropFilter: 'blur(7.9px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          paddingTop: '1.5rem',
          WebkitFilter: 'grayscale(20%)',
          minWidth: '150px',
          filter: 'grayscale(20%)',
          zIndex: '130',
          marginLeft: '20px',
        }}
      >
        <Box
          component='img'
          src={tank}
          style={{ width: '150px', height: '150px', zIndex: '1300' }}
        ></Box>
        <Typography
          variant='h2'
          color='whitesmoke'
          mb='5px'
          fontSize='25px'
          // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
        >
          {person.firstname} {person.lastname}
        </Typography>
        <Typography
          variant='h5'
          fontWeight='lighter'
          color='whitesmoke'
          mb='15px'
          fontSize='20px'
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
              window.open(`${person.linkedin}`);
            }}
            style={styles.icons}
            src={linkedInPng}
            sx={{ ':hover': { width: '10px' } }}
          ></Box>
          <Box
            id='link'
            component='img'
            onClick={() => {
              window.open(`${person.github}`);
            }}
            style={styles.icons}
            src={githubPng}
          ></Box>
        </Box>
      </Box>
    );
  });

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

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
          {teamatesInSvelte}
        </Box>
      </div>
    </div>
  );
};

//   return (
//     <div
//       id='teamTopDiv'
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: '40000',
//       }}
//     >
//       <div
//         id='TeamBio'
//         style={{
//           zIndex: '14001',
//           // width: '800px',
//           // height:"auto",
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography
//           variant='h2'
//           textAlign='center'
//           style={{
//             zIndex: '13006',
//           }}
//           sx={{
//             fontFamily: 'outfit',
//             fontSize: '6.2vw',
//             fontWeight: 600,
//             letterSpacing: '1px',
//             color: 'white',
//             textDecoration: 'none',
//             mt: 10,
//             mb: 9,
//             textShadow: '1px 1px 5px rgb(0, 0, 0, 0.5)',
//           }}
//         >
//           Meet Our Engineering Team
//         </Typography>
//         <Box
//           id='members'
//           justifyContent='center'
//           alignContent='center'
//           style={{ zIndex: '1301' }}
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             flexWrap: 'wrap',
//             alignItems: 'flex-start',
//             mb: 10,
//             zIndex: '130',
//           }}
//         >
//           <Box
//             id='contributor'
//             textAlign='center'
//             className='teammates'
//             width='250px'
//             style={{
//               background:
//                 'linear-gradient(150deg, #ffffff47, #f5dede70, rgba(254, 123, 145, 0.32))',
//               borderRadius: '16px',
//               boxShadow: '0 4px 30px #0000001a',
//               backdropFilter: 'blur(7.9px)',
//               WebkitBackdropFilter: 'blur(7.9px)',
//               border: '1px solid rgba(255, 255, 255, 0.18)',
//               paddingTop: '1.5rem',
//               WebkitFilter: 'grayscale(20%)',
//               minWidth: '150px',
//               filter: 'grayscale(20%)',
//               zIndex: '130',
//             }}
//           >
//             <Box
//               component='img'
//               src={tank}
//               style={{ width: '150px', height: '150px', zIndex: '1300' }}
//             ></Box>
//             <Typography
//               variant='h2'
//               color='whitesmoke'
//               mb='5px'
//               fontSize='25px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Janice Chu
//             </Typography>
//             <Typography
//               variant='h5'
//               fontWeight='lighter'
//               color='whitesmoke'
//               mb='15px'
//               fontSize='20px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Software Engineer
//             </Typography>
//             <Box
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 zIndex: '130',
//               }}
//             >
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open(
//                     'https://www.linkedin.com/in/janice-chu-075705284/'
//                   );
//                 }}
//                 style={styles.icons}
//                 src={linkedInPng}
//                 sx={{ ':hover': { width: '10px' } }}
//               ></Box>
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://github.com/JaniceKZ');
//                 }}
//                 style={styles.icons}
//                 src={githubPng}
//               ></Box>
//             </Box>
//           </Box>
//           <Box
//             id='contributor'
//             textAlign='center'
//             width='250px'
//             style={{
//               background:
//                 'linear-gradient(150deg, #ffffff47, #f5dede70, rgba(254, 123, 145, 0.32))',
//               borderRadius: '16px',
//               boxShadow: '0 4px 30px #0000001a',
//               backdropFilter: 'blur(7.9px)',
//               WebkitBackdropFilter: 'blur(7.9px)',
//               border: '1px solid rgba(255, 255, 255, 0.18)',
//               paddingTop: '1.5rem',
//               WebkitFilter: 'grayscale(20%)',
//               minWidth: '150px',
//               filter: 'grayscale(20%)',
//               zIndex: '130',
//               marginLeft: '20px',
//             }}
//           >
//             <Box
//               component='img'
//               src={tank}
//               style={{ width: '150px', height: '150px' }}
//             ></Box>
//             <Typography
//               variant='h2'
//               color='whitesmoke'
//               mb='5px'
//               fontSize='25px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Laura Glass-Johnston
//             </Typography>
//             <Typography
//               variant='h5'
//               fontWeight='lighter'
//               color='whitesmoke'
//               mb='15px'
//               fontSize='20px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Software Engineer
//             </Typography>
//             <Box
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}
//             >
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open(
//                     'https://www.linkedin.com/in/laura-glass-johnston-b7831974/'
//                   );
//                 }}
//                 style={styles.icons}
//                 src={linkedInPng}
//               ></Box>
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://github.com/ellgeejay');
//                 }}
//                 style={styles.icons}
//                 src={githubPng}
//               ></Box>
//             </Box>
//           </Box>
//           <Box
//             id='contributor'
//             textAlign='center'
//             width='250px'
//             style={{
//               background:
//                 'linear-gradient(150deg, #ffffff47, #f5dede70, rgba(254, 123, 145, 0.32))',
//               borderRadius: '16px',
//               boxShadow: '0 4px 30px #0000001a',
//               backdropFilter: 'blur(7.9px)',
//               WebkitBackdropFilter: 'blur(7.9px)',
//               border: '1px solid rgba(255, 255, 255, 0.18)',
//               paddingTop: '1.5rem',
//               WebkitFilter: 'grayscale(20%)',
//               minWidth: '150px',
//               filter: 'grayscale(20%)',
//               zIndex: '130',
//               marginLeft: '20px',
//             }}
//           >
//             <Box
//               component='img'
//               src={tank}
//               style={{ width: '150px', height: '150px' }}
//             ></Box>
//             <Typography
//               variant='h2'
//               color='whitesmoke'
//               mb='5px'
//               fontSize='25px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Maciej Malecki
//             </Typography>
//             <Typography
//               variant='h5'
//               fontWeight='lighter'
//               color='whitesmoke'
//               mb='15px'
//               fontSize='20px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Software Engineer
//             </Typography>
//             <Box
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}
//             >
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://www.linkedin.com/in/mmaciej/');
//                 }}
//                 style={styles.icons}
//                 src={linkedInPng}
//               ></Box>
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://github.com/maciekmalecki');
//                 }}
//                 style={styles.icons}
//                 src={githubPng}
//               ></Box>
//             </Box>
//           </Box>
//           <Box
//             id='contributor'
//             textAlign='center'
//             width='250px'
//             style={{
//               background:
//                 'linear-gradient(150deg, #ffffff47, #f5dede70, rgba(254, 123, 145, 0.32))',
//               borderRadius: '16px',
//               boxShadow: '0 4px 30px #0000001a',
//               backdropFilter: 'blur(7.9px)',
//               WebkitBackdropFilter: 'blur(7.9px)',
//               border: '1px solid rgba(255, 255, 255, 0.18)',
//               paddingTop: '1.5rem',
//               WebkitFilter: 'grayscale(20%)',
//               minWidth: '150px',
//               filter: 'grayscale(20%)',
//               zIndex: '130',
//               marginLeft: '20px',
//             }}
//           >
//             <Box
//               component='img'
//               src={tank}
//               style={{ width: '150px', height: '150px' }}
//             ></Box>
//             <Typography
//               variant='h2'
//               color='whitesmoke'
//               mb='5px'
//               fontSize='25px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Francis Espinoza
//             </Typography>
//             <Typography
//               variant='h5'
//               fontWeight='lighter'
//               color='whitesmoke'
//               mb='15px'
//               fontSize='20px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Software Engineer
//             </Typography>
//             <Box
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}
//             >
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://www.linkedin.com/in/espinozafrancis');
//                 }}
//                 style={styles.icons}
//                 src={linkedInPng}
//               ></Box>
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://github.com/francis8933');
//                 }}
//                 style={styles.icons}
//                 src={githubPng}
//               ></Box>
//             </Box>
//           </Box>
//           <Box
//             id='contributor'
//             textAlign='center'
//             width='250px'
//             style={{
//               background:
//                 'linear-gradient(150deg, #ffffff47, #f5dede70, rgba(254, 123, 145, 0.32))',
//               borderRadius: '16px',
//               boxShadow: '0 4px 30px #0000001a',
//               backdropFilter: 'blur(7.9px)',
//               WebkitBackdropFilter: 'blur(7.9px)',
//               border: '1px solid rgba(255, 255, 255, 0.18)',
//               paddingTop: '1.5rem',
//               WebkitFilter: 'grayscale(20%)',
//               minWidth: '150px',
//               filter: 'grayscale(20%)',
//               zIndex: '130',
//               marginLeft: '20px',
//             }}
//           >
//             <Box
//               component='img'
//               src={tank}
//               style={{ width: '150px', height: '150px' }}
//             ></Box>
//             <Typography
//               variant='h2'
//               color='whitesmoke'
//               mb='5px'
//               fontSize='25px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Alex Vranas
//             </Typography>
//             <Typography
//               variant='h5'
//               fontWeight='lighter'
//               color='whitesmoke'
//               mb='15px'
//               fontSize='20px'
//               // textShadow='1px 1px 5px rgb(0, 0, 0, 0.3)'
//             >
//               Software Engineer
//             </Typography>
//             <Box
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}
//             >
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://www.linkedin.com/in/avranas/');
//                 }}
//                 style={styles.icons}
//                 src={linkedInPng}
//               ></Box>
//               <Box
//                 id='link'
//                 component='img'
//                 onClick={() => {
//                   window.open('https://github.com/avranas');
//                 }}
//                 style={styles.icons}
//                 src={githubPng}
//               ></Box>
//             </Box>
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

export default Contributor;
