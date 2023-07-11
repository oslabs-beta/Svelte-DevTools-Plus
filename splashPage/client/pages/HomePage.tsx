const react = require('react');

import Header from '../components/Header';
import Contribuidors from '../components/Contributors';
import Mvps from '../components/Mvps';
import Instructions from '../components/Instructions';
import LearnMore from '../components/LearnMore';
import SvelteDevToolPlus from '../components/SvelteDevToolPlus';

const HomePage = () => {
  return (
    <div>
      <Header />
      <SvelteDevToolPlus />
      <Instructions />
      <LearnMore />
      <Mvps />
      <Contribuidors />
    </div>
  );
};

export default HomePage;
