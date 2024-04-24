import React from 'react';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-background">
        <div className="menu-content">
            <a href="#">Home</a>
            <a href="#">Archive</a>
            <a href="#">Maps</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;