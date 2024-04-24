import React, { CSSProperties } from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={leftContentStyle}>
        <div style={backgroundStyle}>
        <img src={"./src/icons/Book.png"} style={iconStyle} />
        </div>
      </div>
      
      <a href="/profile" style={linkStyle1}>Web Service</a>

      <div style={rightContentStyle}>
        <a href="/profile" style={linkStyle}>Profile</a>
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