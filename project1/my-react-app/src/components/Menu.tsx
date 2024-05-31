import React from 'react';
import './Menu.css';
import { Link} from 'react-router-dom';


const Menu = () => {
  return (

    <div className="menu">
      <div className="menu-background">
        <div className="menu-content">
            <Link to="/">Home</Link>
            <Link to="/archive">Archive</Link>
            <Link to="/maps">Maps</Link>
        </div>
      </div>
    </div>
   
  );
};

export default Menu;