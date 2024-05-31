import React, { CSSProperties, useEffect, useState } from "react";
import { Link} from 'react-router-dom';

const Header = ({isAuth}) => {
  const [prof, setProf] = useState(<Link to="/signin" style={linkStyle}>Sign In</Link>);
  useEffect(() => {
    if (isAuth) {
      setProf(<Link to="/profile" style={linkStyle}>Profile</Link>);
    } else {
      setProf(<Link to="/signin" style={linkStyle}>Login</Link>);
    }
  }, [isAuth]);
  return (
    <header style={headerStyle}>
      <div style={leftContentStyle}>
        <div style={backgroundStyle}>
        <img src={"./src/icons/Book.png"} style={iconStyle} />
        </div>
      </div>
      
      <Link to="/" style={linkStyle1}>Web Service</Link>

      <div style={rightContentStyle}>
        {prof}
      </div>
    </header>
  );
}



const headerStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Inika',
  fontSize: '1.5rem',
  background: '#706762',
  color: '#fff',
  position: "relative",

};

const leftContentStyle: CSSProperties  = {
  height: '100%', 
  width: '15%',
 
// Pushes the icon to the left
};

const backgroundStyle: CSSProperties = {
  display: 'flex',

  // 20% of the header width
  height: '100%', // Full height of the header
  background: '#6A110B',  // Set background color different from header
  top: '0',
  left: '0',
  alignItems: 'center',
  justifyContent:'center'
};

const iconStyle: CSSProperties = {
  width: '40px',
  height: '40px',

  paddingBottom: '1rem',
  paddingTop: '1rem',
};



const rightContentStyle = {
  marginLeft: 'auto',
// Pushes the link to the right
};



const linkStyle = {
  textDecoration: 'none',
  margin: '50px',
  color: '#FBEDDC',


};

const linkStyle1 = {
  textDecoration: 'none',
  color: '#FBEDDC',


  marginLeft: '70px'
};


  
  export default Header;