import './IconButton.css'; 
import React from 'react';

const IconButton = ({ icon, onClick, style }) => {
  return (
    <button className="icon-button" onClick={onClick} style={style}>
      <img src={icon} alt="icon" className="icon" />
    </button>
  );
};

export default IconButton;