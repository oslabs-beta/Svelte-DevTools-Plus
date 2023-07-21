const react = require('react');

import Header from '../components/Header';
import Contribuidors from '../components/Contributors';
import Mvps from '../components/Mvps';
import Instructions from '../components/Instructions';
import SvelteDevToolPlus from '../components/SvelteDevToolPlus';
import NavBar from '../components/NavBar';
import '../components/styleNavBar.css';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
import Section5 from './section5';

const HomePage = () => {
  return (
    <div className='homePage'>
      <NavBar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};

export default HomePage;
