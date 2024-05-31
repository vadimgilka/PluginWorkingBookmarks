import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = ({isAuth}) => {
const moveToStart = () => {
  let str = "/";
  if(isAuth)
    {
        navigate("/archive");
    }
    else{
      navigate("/login");
    }

}

  const navigate = useNavigate(); 
  return (
    <div className="text-block-container">
      <div className="text">Welcome to the web-service<br/>that will help you organize links<br/>to Internet resources and visualize them!</div>
      <button onClick={moveToStart} className="button">Start</button>
    </div>
  );
};

export default Home;