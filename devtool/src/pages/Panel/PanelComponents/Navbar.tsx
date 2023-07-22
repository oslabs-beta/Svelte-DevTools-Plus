import React from 'react';
import './TreeComponent.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li className="active">
          <Link to="/">Step</Link>
        </li>
        <li>
          <Link to="/tree">Tree</Link>
        </li>
      </ul>
    </nav>
  );
}
