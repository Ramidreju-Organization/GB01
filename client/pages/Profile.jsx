import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from '../components/Navbar.jsx';
import '../stylesheets/Profile.scss';

const Profile = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(document.cookie);
  //   let cookieString = document.cookie;
  //   cookieString =
  //     'codesmith=hi; secret=NaN; cookie-name=sent-cookie; userName=Wes' = '; Max-Age=0';
  //   document.cookie = cookieString;
  // }, []);

  const handleLogOutUser = () => {
    localStorage.removeItem('username');
    // figure out how to remove the cookie
    console.log(document.cookie);
    navigate('/home');
  };

  return (
    <div id="profileContainer">
      <h1 id="profileTitle">
        {localStorage.getItem('username')}'s Profile Page
      </h1>
      {/* <p id="profileGreeting">Hello {localStorage.getItem('username')}!</p> */}
      <button id="logoutButton" onClick={handleLogOutUser}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
