// src/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><Link to="/">User Input</Link></li>
        <li><Link to="/data-table">Data Table</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
