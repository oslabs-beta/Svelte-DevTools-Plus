import React from 'react';
import '../TreeComponent/TreeComponent.css';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

// add an event listener that would listen for a click on each li

export default function Navbar() {
  const activeColor = 'rgb(28, 195, 221)';
  const inactiveColor = '#fff';
  const activeBackground = 'rgba(50, 50, 50, 0.25)';
  const inactiveBackground = 'rgba(0, 0, 0, 0)';

  interface Active {
    isActive: boolean;
  }

  const buttonStyle = ({ isActive }: Active) => ({
    color: isActive ? activeColor : inactiveColor,
    background: isActive ? activeBackground : inactiveBackground,
    '&:hover': {
      background: '#ff0000',
    },
  });

  return (
    <nav className="nav">
      {/* add className="active" back in...though this doesn't change from one to the other, only stays on "List". Need it to change the className onClick */}
      {/* on hover, set to "active", on click, set name to "active" */}
      {/* maybe use a boolean to track if the li has been clicked on or not. Maybe "lastClicked" or something?? */}
      <div className="nav-option">
        <NavLink className="nav-link" to="/" style={buttonStyle}>
          List
        </NavLink>
      </div>
      <div className="nav-option">
        <NavLink
          className="nav-link"
          data-testid="tree-link"
          to="/tree"
          style={buttonStyle}
        >
          Tree
        </NavLink>
      </div>
    </nav>
  );
}
