import React from 'react';
import './TreeComponent.css';
import { Link } from 'react-router-dom';
import './Navbar.css';

// add an event listener that would listen for a click on each li

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        {/* add className="active" back in...though this doesn't change from one to the other, only stays on "Step". Need it to change the className onClick */}
        {/* on hover, set to "active", on click, set name to "active" */}
        {/* maybe use a boolean to track if the li has been clicked on or not. Maybe "lastClicked" or something?? */}
        <li className="step">
          <Link to="/">Step</Link>
        </li>
        <li className="tree">
          <Link to="/tree">Tree</Link>
        </li>
      </ul>
    </nav>
  );
}
