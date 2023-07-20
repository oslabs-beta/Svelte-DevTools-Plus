import React from 'react';
import { Link } from 'react-scroll';


const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='section1' smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li>
          <Link to='section2' smooth={true} duration={500}>
            Features
          </Link>
        </li>
        <li>
          <Link to='section3' smooth={true} duration={500}>
            Press
          </Link>
        </li>
        <li>
          <Link to='section4' smooth={true} duration={500}>
            Team
          </Link>
        </li>
        <li>
          <Link to='section5' smooth={true} duration={500}>
            Github
          </Link>
        </li>
        <li>
          <Link to='section6' smooth={true} duration={500}>
            Extension
          </Link>
        </li>
        {/* Add more sections as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
