const react = require('react');

import Header from './Header';
import Contribuidors from './GetContributor';
import Mvps from './Mvps';
import Instructions from './Instructions';
import SvelteDevToolPlus from './SvelteDevToolPlus';
import NavBar from '../client/components/NavBar';
import '../components/styleNavBar.css';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
import Section5 from './section5';

const HomePage2 = () => {
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

export default HomePage2;
