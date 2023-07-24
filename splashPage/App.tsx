import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './client/components/NavBar';
import MainHeader from './client/components/MainHeader';
import Features from './client/components/Features';
import Press from './client/components/Press';
import Contributor from './client/components/Contributor';
import { useCallback } from 'react';
import type { Container, Engine } from 'tsparticles-engine';
import Particles from 'react-tsparticles';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim';

// const { useState } = require('react');
// const Style = require('./style.css');

const App = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  // console.log('user status', user);

  // const loginHandler = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   console.log(email, password);
  //   let user = await fetch('http://localhost:3000/loginUser', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const response = await user.json();
  //   console.log(response, 'response');
  //   setUser(response);
  //   console.log('user', user);
  // };
  // const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setPassword(e.target.value);
  // };
  // const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(e.target.value);
  // };

  return (
    <div className='App'>
      <Navbar />
      <MainHeader />
      <Features />
      <Press />
      <Contributor />
      <Particles
        id='tsparticles'
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#1a1a1a',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ff3e00',
            },
            links: {
              color: '#ff3e00',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default App;

/* <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        path="/login"
        element={
          user === null ? (
            <Login
              loginHandler={loginHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
            />
          ) : user === true ? (
            <Account />
          ) : (
            <Signup />
          )
        }
      ></Route>
      <Route
        path="/signup"
        element={
          user === null ? (
            <Signup />
          ) : user === true ? (
            <Account />
          ) : (
            <Login
              loginHandler={loginHandler}
              passwordHandler={passwordHandler}
              emailHandler={emailHandler}
            />
          )
        }
      ></Route>
      <Route
        path="/account"
        element={user === true ? <Account /> : <HomePage />}
      ></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes> */

// <Route path="/" element={<HomePage />}></Route>
//   <Route
//     path="/login"
//     element={
//       user === null ? (
//         <Login
//           loginHandler={loginHandler}
//           passwordHandler={passwordHandler}
//           emailHandler={emailHandler}
//         />
//       ) : user === true ? (
//         <Account />
//       ) : (
//         <Signup />
//       )
//     }
//   ></Route>
//   <Route
//     path="/signup"
//     element={
//       user === null ? (
//         <Signup />
//       ) : user === true ? (
//         <Account />
//       ) : (
//         <Login
//           loginHandler={loginHandler}
//           passwordHandler={passwordHandler}
//           emailHandler={emailHandler}
//         />
//       )
//     }
//   ></Route>
//   <Route
//     path="/account"
//     element={user === true ? <Account /> : <HomePage />}
//   ></Route>
//   <Route path="*" element={<PageNotFound />}></Route>
// </Routes>
